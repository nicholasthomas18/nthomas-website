"""
Generate interactive Plotly charts for the BikeShare project page.

Reads the real Kaggle Bike Sharing Demand training data and emits three
self-contained HTML charts into public/bikeshare-charts/, embedded via iframe
on app/projects/bikeshare-bart-r/page.tsx (mirroring the March Madness charts).

Run:  python3 scripts/bikeshare_charts.py
Data: ~/Desktop/BikeShare/bike-sharing-demand/train.csv
"""

import os
import numpy as np
import pandas as pd
import plotly.graph_objects as go

# ── Palette (matches the .bs-root theme on the project page) ──
INK = "#1A1A18"
MUTED = "#6B6B66"
ACCENT = "#2D6A4F"       # forest green
ACCENT_MID = "#52B788"
ACCENT_DARK = "#1B4332"
BORDER = "#D9D7CF"
PAPER = "rgba(0,0,0,0)"  # transparent so the iframe background shows through
FONT = "IBM Plex Mono, monospace"

DATA = os.path.expanduser("~/Desktop/BikeShare/bike-sharing-demand/train.csv")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "bikeshare-charts")
os.makedirs(OUT, exist_ok=True)

df = pd.read_csv(DATA, parse_dates=["datetime"])
df["hour"] = df["datetime"].dt.hour

SEASON = {1: "Spring", 2: "Summer", 3: "Fall", 4: "Winter"}
WEATHER = {1: "Clear", 2: "Mist / Cloudy", 3: "Light Rain / Snow", 4: "Heavy Rain / Snow"}

BASE_LAYOUT = dict(
    paper_bgcolor=PAPER,
    plot_bgcolor=PAPER,
    font=dict(family=FONT, color=MUTED, size=12),
    margin=dict(l=55, r=20, t=50, b=45),
    title=dict(font=dict(family="DM Serif Display, serif", color=INK, size=18)),
    xaxis=dict(gridcolor=BORDER, linecolor=BORDER, zerolinecolor=BORDER, color=MUTED),
    yaxis=dict(gridcolor=BORDER, linecolor=BORDER, zerolinecolor=BORDER, color=MUTED),
    legend=dict(font=dict(color=MUTED), bgcolor=PAPER),
    colorway=[ACCENT, ACCENT_MID, "#95D5B2", ACCENT_DARK],
)

CONFIG = {"displayModeBar": False, "responsive": True}


def save(fig, name):
    fig.update_layout(**BASE_LAYOUT)
    path = os.path.join(OUT, name)
    fig.write_html(path, include_plotlyjs="cdn", full_html=True, config=CONFIG)
    print("wrote", os.path.relpath(path))


# ── 01 · Demand by hour, split by working day vs weekend ──
by_hour = (
    df.groupby(["hour", "workingday"])["count"].mean().reset_index()
)
fig1 = go.Figure()
fig1.add_trace(go.Scatter(
    x=by_hour[by_hour.workingday == 1]["hour"],
    y=by_hour[by_hour.workingday == 1]["count"],
    mode="lines+markers", name="Working day",
    line=dict(color=ACCENT, width=3), marker=dict(size=6),
))
fig1.add_trace(go.Scatter(
    x=by_hour[by_hour.workingday == 0]["hour"],
    y=by_hour[by_hour.workingday == 0]["count"],
    mode="lines+markers", name="Weekend / holiday",
    line=dict(color=ACCENT_MID, width=3, dash="dot"), marker=dict(size=6),
))
fig1.update_layout(
    title="Average rentals by hour of day",
    xaxis_title="Hour", yaxis_title="Avg rentals",
    xaxis=dict(dtick=2),
)
save(fig1, "01_demand_by_hour.html")


# ── 02 · Demand by season and weather ──
by_sw = df.copy()
by_sw["season_name"] = by_sw["season"].map(SEASON)
by_sw["weather_name"] = by_sw["weather"].map(WEATHER)
season_order = ["Spring", "Summer", "Fall", "Winter"]
weather_order = ["Clear", "Mist / Cloudy", "Light Rain / Snow", "Heavy Rain / Snow"]
pivot = (
    by_sw.groupby(["season_name", "weather_name"])["count"].mean().reset_index()
)
fig2 = go.Figure()
greens = {"Clear": ACCENT, "Mist / Cloudy": ACCENT_MID,
          "Light Rain / Snow": "#95D5B2", "Heavy Rain / Snow": ACCENT_DARK}
for w in weather_order:
    sub = pivot[pivot.weather_name == w]
    sub = sub.set_index("season_name").reindex(season_order).reset_index()
    fig2.add_trace(go.Bar(
        x=sub["season_name"], y=sub["count"], name=w,
        marker_color=greens[w],
    ))
fig2.update_layout(
    title="Average rentals by season & weather",
    barmode="group", xaxis_title="Season", yaxis_title="Avg rentals",
)
save(fig2, "02_demand_by_season_weather.html")


# ── 03 · Target distribution: raw count vs log(count) ──
fig3 = go.Figure()
fig3.add_trace(go.Histogram(
    x=df["count"], name="count (raw)", marker_color=ACCENT_MID,
    opacity=0.85, nbinsx=50, xaxis="x", yaxis="y",
))
fig3.add_trace(go.Histogram(
    x=np.log(df["count"]), name="log(count)", marker_color=ACCENT,
    opacity=0.85, nbinsx=50, xaxis="x2", yaxis="y2",
))
fig3.update_layout(
    title="Why log-transform the target",
    grid=dict(rows=1, columns=2, pattern="independent"),
    xaxis=dict(title="count (raw)", gridcolor=BORDER, color=MUTED, domain=[0, 0.46]),
    yaxis=dict(title="frequency", gridcolor=BORDER, color=MUTED),
    xaxis2=dict(title="log(count)", gridcolor=BORDER, color=MUTED, domain=[0.54, 1]),
    yaxis2=dict(gridcolor=BORDER, color=MUTED, anchor="x2"),
    showlegend=False,
)
save(fig3, "03_target_distribution.html")

print("done")
