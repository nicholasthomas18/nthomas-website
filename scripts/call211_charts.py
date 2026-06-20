"""
Generate interactive Plotly charts for the 211 Call Volume Forecasting page.

Reproduces the aggregation/cleaning/modeling from the project notebook
(CallForecast.ipynb) using the real call log, and emits three self-contained
HTML charts into public/call211-charts/, embedded via iframe on
app/projects/211-call-volume-forecasting/page.tsx.

The charts use only AGGREGATED counts — no individual call records are embedded.

Run:  python3 scripts/call211_charts.py
Data: ~/Desktop/211-Call-Volume-Forecasting-main/211FactCalls.csv
Deps: pandas, numpy, plotly, prophet, holidays
"""

import os
from datetime import date
import numpy as np
import pandas as pd
import plotly.graph_objects as go

# ── United Way palette ──
BLUE = "#0344b5"
RED = "#fd372c"
YELLOW = "#ffb901"
INK = "#1A1A18"
MUTED = "#6B6B66"
BORDER = "#E2E2DC"
PAPER = "rgba(0,0,0,0)"  # transparent — iframe bg shows through
FONT = "IBM Plex Mono, monospace"

DATA = os.path.expanduser(
    "~/Desktop/211-Call-Volume-Forecasting-main/211FactCalls.csv"
)
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "call211-charts")
os.makedirs(OUT, exist_ok=True)

BASE_LAYOUT = dict(
    paper_bgcolor=PAPER,
    plot_bgcolor=PAPER,
    font=dict(family=FONT, color=MUTED, size=12),
    margin=dict(l=55, r=20, t=50, b=45),
    title=dict(font=dict(family="DM Serif Display, serif", color=INK, size=18)),
    xaxis=dict(gridcolor=BORDER, linecolor=BORDER, zerolinecolor=BORDER, color=MUTED),
    yaxis=dict(gridcolor=BORDER, linecolor=BORDER, zerolinecolor=BORDER, color=MUTED),
    legend=dict(font=dict(color=MUTED), bgcolor=PAPER),
)
CONFIG = {"displayModeBar": False, "responsive": True}


def save(fig, name):
    fig.update_layout(**BASE_LAYOUT)
    path = os.path.join(OUT, name)
    fig.write_html(path, include_plotlyjs="cdn", full_html=True, config=CONFIG)
    print("wrote", os.path.relpath(path))


# ── Load + aggregate to hourly (mirrors the notebook) ──
print("loading call log...")
df_raw = pd.read_csv(DATA, usecols=["InteractionDate"], parse_dates=["InteractionDate"])

# Salesforce exports timestamps in UTC — convert to Mountain Time (handles
# MST/MDT), then drop the tz label, exactly as the project notebook does.
# Without this, hours are shifted ~6–7h and the daily pattern is wrong.
df_raw["InteractionDate"] = (
    df_raw["InteractionDate"]
    .dt.tz_localize("UTC")
    .dt.tz_convert("US/Mountain")
    .dt.tz_localize(None)
)

df_hourly = (
    df_raw.groupby(df_raw["InteractionDate"].dt.floor("h"))
    .size()
    .reset_index(name="y")
    .rename(columns={"InteractionDate": "ds"})
)
full_range = pd.date_range(df_hourly["ds"].min(), df_hourly["ds"].max(), freq="h")
df_hourly = (
    df_hourly.set_index("ds").reindex(full_range, fill_value=0).reset_index()
)
df_hourly.columns = ["ds", "y"]

# Drop the 22 known-bad dates the notebook removes (Dec 2022 logging dump that
# bulk-loaded ~2,115 calls onto one timestamp, plus other anomalies). Done here
# so every chart reflects the cleaned series the model was actually trained on.
bad_dates = set(pd.to_datetime([
    "2022-12-01", "2022-12-02", "2022-12-03", "2022-12-04", "2022-12-05",
    "2022-12-06", "2022-12-07", "2022-12-08", "2022-12-09", "2022-12-10",
    "2022-12-11", "2022-12-12", "2022-12-13", "2022-11-30",
    "2021-02-15", "2021-01-18", "2020-03-16", "2020-03-17", "2020-03-18",
    "2020-03-19", "2020-03-20", "2020-03-23",
]).date)
df_hourly = df_hourly[~df_hourly["ds"].dt.date.isin(bad_dates)].copy()


# ── 01 · Average calls by hour of day ──
avg_by_hour = df_hourly.groupby(df_hourly["ds"].dt.hour)["y"].mean()
colors = [BLUE if h == int(avg_by_hour.idxmax()) else "#9DB6E8" for h in avg_by_hour.index]
fig1 = go.Figure(go.Bar(
    x=[f"{h:02d}:00" for h in avg_by_hour.index],
    y=avg_by_hour.values, marker_color=colors,
))
fig1.add_vrect(x0=7.5, x1=16.5, fillcolor=YELLOW, opacity=0.12, line_width=0,
               annotation_text="Operating hours", annotation_position="top left",
               annotation_font_color=MUTED)
fig1.update_layout(
    title="Average calls by hour of day (2019–2026)",
    xaxis_title="Hour of day", yaxis_title="Avg calls / hour",
)
save(fig1, "01_avg_by_hour.html")


# ── 02 · Daily call volume over time (VITA seasonal spikes) ──
df_daily = df_hourly.resample("D", on="ds")["y"].sum().reset_index()
fig2 = go.Figure(go.Scatter(
    x=df_daily["ds"], y=df_daily["y"], mode="lines",
    line=dict(color=BLUE, width=1.2), name="Calls / day",
))
# Shade VITA tax season (Jan 1 – Apr 15) each year
for yr in range(df_daily["ds"].dt.year.min(), df_daily["ds"].dt.year.max() + 1):
    fig2.add_vrect(x0=f"{yr}-01-01", x1=f"{yr}-04-15",
                   fillcolor=RED, opacity=0.06, line_width=0)
fig2.update_layout(
    title="Daily call volume — red bands mark VITA tax season",
    xaxis_title="Date", yaxis_title="Calls / day",
)
save(fig2, "02_daily_volume.html")


# ── 03 · Forecast vs actual on the hold-out test window (real Prophet model) ──
print("fitting Prophet for forecast-vs-actual chart...")
import holidays as holidays_lib
from prophet import Prophet

# df_hourly is already cleaned (bad dates dropped above). Filter to operating
# hours only (8am–4pm floored → hours 8..16), matching the notebook.
df_model = df_hourly[df_hourly["ds"].dt.hour.between(8, 16)].copy()
dfp = df_model[["ds", "y"]].copy()

us_holidays = holidays_lib.US(years=dfp["ds"].dt.year.unique().tolist())
holiday_dates = set(us_holidays.keys())
pioneer = {date(y, 7, 24) for y in dfp["ds"].dt.year.unique()}
all_hol = holiday_dates | pioneer

d = dfp["ds"].dt
dfp["is_covid"] = ((dfp["ds"] >= "2020-03-01") & (dfp["ds"] < "2021-01-01")).astype(int)
dfp["is_holiday"] = dfp["ds"].dt.date.isin(holiday_dates).astype(int)
dfp["is_vita"] = ((d.month <= 3) | ((d.month == 4) & (d.day <= 15))).astype(int)
dfp["is_pioneer_day"] = ((d.month == 7) & (d.day == 24)).astype(int)
dfp["is_tax_deadline"] = ((d.month == 4) & (d.day == 15)).astype(int)
dfp["is_day_before_holiday"] = (dfp["ds"].dt.date + pd.Timedelta(days=1)).isin(all_hol).astype(int)
dfp["is_day_after_holiday"] = (dfp["ds"].dt.date - pd.Timedelta(days=1)).isin(all_hol).astype(int)

REGRESSORS = ["is_covid", "is_holiday", "is_vita", "is_pioneer_day",
              "is_tax_deadline", "is_day_before_holiday", "is_day_after_holiday"]

CUTOFF = pd.Timestamp("2026-05-04")
train = dfp[dfp["ds"] < CUTOFF].copy()
test = dfp[dfp["ds"] >= CUTOFF].copy()

m = Prophet(seasonality_mode="multiplicative", changepoint_prior_scale=0.15,
            daily_seasonality=True, weekly_seasonality=True, yearly_seasonality=True)
for r in REGRESSORS:
    m.add_regressor(r)
m.fit(train)

fc = m.predict(test)
res = test[["ds", "y"]].reset_index(drop=True)
res["yhat"] = fc["yhat"].clip(lower=0).values
res["yhat_lower"] = fc["yhat_lower"].clip(lower=0).values
res["yhat_upper"] = fc["yhat_upper"].clip(lower=0).values

fig3 = go.Figure()
fig3.add_trace(go.Scatter(
    x=list(res["ds"]) + list(res["ds"][::-1]),
    y=list(res["yhat_upper"]) + list(res["yhat_lower"][::-1]),
    fill="toself", fillcolor="rgba(3,68,181,0.12)", line=dict(width=0),
    hoverinfo="skip", name="80% interval",
))
fig3.add_trace(go.Scatter(x=res["ds"], y=res["y"], mode="lines",
                          line=dict(color=INK, width=1.4), name="Actual"))
fig3.add_trace(go.Scatter(x=res["ds"], y=res["yhat"], mode="lines",
                          line=dict(color=RED, width=1.6), name="Forecast"))
fig3.update_layout(
    title="Forecast vs actual — hold-out test (May–Jun 2026)",
    xaxis_title="Date", yaxis_title="Calls / hour",
)
save(fig3, "03_forecast_vs_actual.html")

print("done")
