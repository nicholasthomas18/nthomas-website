export const metadata = {
  title: "211 Call Volume Forecasting - Portfolio",
  description:
    "Forecasting daily and hourly call volume for United Way's 211 helpline with Facebook Prophet — seven years of call data, domain-driven regressors, and a live staffing dashboard.",
};

export default function Call211ForecastingPage() {
  const dataSteps = [
    {
      step: "STEP 01",
      title: "From Raw Call Log to Hourly Series",
      text: "The source was a 405,267-row Salesforce export of every 211 interaction since 2019. Timestamps arrive in UTC, so the first move was converting them to Mountain Time before aggregating calls into an hourly series. Hours with no calls were filled with explicit zeros — a quiet hour is real signal, not missing data.",
      stat: "405,267 calls → hourly series",
    },
    {
      step: "STEP 02",
      title: "Cleaning a Logging Failure",
      text: "A December 2022 system fault had dumped 2,115 calls onto a single timestamp and corrupted nearby dates. Left in, that artifact would teach the model a phantom spike. Twenty-two bad dates (528 hourly rows) were identified and removed so the trend reflects reality.",
      stat: "22 bad dates removed",
    },
    {
      step: "STEP 03",
      title: "Focusing on Operating Hours",
      text: "The center answers calls 8:30 AM – 5:00 PM. Modeling the 15 closed hours of every day would waste the model's capacity learning a flat line. Filtering to the nine open hours left 24,318 rows of the data that actually matters for staffing.",
      stat: "24,318 modeling rows",
    },
  ];

  const modelSteps = [
    {
      step: "STEP 04",
      title: "Encoding What Drives Demand",
      text: "Call volume isn't random — it follows the calendar. Seven binary regressors taught the model the patterns staff already feel: VITA free-tax season (Jan–Apr), federal holidays and Utah's Pioneer Day, the days flanking holidays, the April 15 tax deadline, and the 2020 COVID surge.",
      stat: "7 domain regressors",
    },
    {
      step: "STEP 05",
      title: "Prophet with Multiplicative Seasonality",
      text: "Facebook Prophet was chosen for its native handling of layered seasonality — within-day, within-week, and within-year all at once. Multiplicative mode lets spikes scale with the baseline rather than adding a fixed offset, which matches how a busy season amplifies an already-busy noon.",
      stat: "daily × weekly × yearly",
    },
    {
      step: "STEP 06",
      title: "An Honest Hold-Out Test",
      text: "The model trained on 2019 through May 3, 2026, then forecast the held-out final weeks it had never seen. Predictions were clipped at zero (calls can't be negative) and scored against the real call counts to measure how it would actually perform in production.",
      stat: "23,922 train · 396 test hrs",
    },
  ];

  const skills = [
    ["📞", "Real-World Data Engineering", "Turned a 405K-row operational Salesforce log into a clean modeling dataset — timezone conversion, zero-filling, and removing a real logging-failure artifact."],
    ["🗓️", "Domain Feature Engineering", "Translated how a helpline actually behaves — tax season, holidays, a local Pioneer Day — into seven regressors that gave the model real-world context."],
    ["📈", "Time-Series Forecasting", "Configured Prophet for layered daily, weekly, and yearly seasonality in multiplicative mode, the right fit for demand that scales rather than shifts."],
    ["🎯", "Metric Judgment", "Chose RMSE and MAE as the headline measures for low-count hourly data, and explained why MAPE overstates error here instead of reporting it blindly."],
    ["🧹", "Data Quality Instinct", "Caught and removed a December 2022 logging dump that would have taught the model a spike that never happened."],
    ["🚀", "Deployment for Non-Technical Users", "Shipped the forecast as a Streamlit dashboard answering the questions staff ask: how many calls today, this fortnight, and which upcoming day is busiest."],
  ];

  return (
    <>
      <div className="uw-root">

        {/* HERO */}
        <section className="uw-hero">
          <div className="uw-hero-inner">
            <div className="uw-tag">Python · Prophet · Time-Series Forecasting</div>
            <h1 className="uw-h1">
              Forecasting<br />
              <span>211 Call Volume</span>
            </h1>
            <p className="uw-sub">
              A forecasting model for United Way&apos;s 211 helpline that turns seven
              years of call history into a staffing tool — predicting demand hour by
              hour so the right number of people are ready when someone needs help.
            </p>
            <div className="uw-pills">
              <span className="uw-pill">Python</span>
              <span className="uw-pill">Prophet</span>
              <span className="uw-pill">Pandas</span>
              <span className="uw-pill">Streamlit</span>
              <span className="uw-pill">Forecasting</span>
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="uw-section">
          <div className="uw-label">{"// 01 — The Problem"}</div>
          <h2 className="uw-section-title">
            Staffing a lifeline,<br />
            <em>one hour at a time.</em>
          </h2>
          <p className="uw-body">
            211 connects people to food, housing, and crisis support — often on the
            hardest day of someone&apos;s life. Staff too lightly and calls go
            unanswered when help matters most; staff too heavily and a nonprofit
            burns budget it can&apos;t spare. The center had years of call records but
            no way to see demand coming. The goal: forecast call volume accurately
            enough to schedule against it.
          </p>

          <div className="uw-stat-row">
            <div className="uw-stat">
              <div className="uw-stat-num">405K</div>
              <div className="uw-stat-label">Calls Analyzed</div>
            </div>
            <div className="uw-stat-divider" />
            <div className="uw-stat">
              <div className="uw-stat-num">7.5</div>
              <div className="uw-stat-label">Years of History</div>
            </div>
            <div className="uw-stat-divider" />
            <div className="uw-stat">
              <div className="uw-stat-num">146</div>
              <div className="uw-stat-label">Avg Calls / Day</div>
            </div>
            <div className="uw-stat-divider" />
            <div className="uw-stat">
              <div className="uw-stat-num">437</div>
              <div className="uw-stat-label">Busiest Day on Record</div>
            </div>
          </div>
        </section>

        {/* THE DATA */}
        <section className="uw-section uw-section-tinted">
          <div className="uw-label">{"// 02 — The Data"}</div>
          <h2 className="uw-section-title">
            Getting the history <em>honest</em>
          </h2>
          <p className="uw-body">
            Before any forecasting, the raw call log had to become a trustworthy time
            series. That meant the unglamorous work that decides whether a model is any
            good: fixing timezones, deciding what a gap means, and refusing to learn
            from corrupted data.
          </p>
          <div className="uw-steps">
            {dataSteps.map((s) => (
              <div key={s.step} className="uw-step">
                <div className="uw-step-num">{s.step}</div>
                <div className="uw-step-body">
                  <h3 className="uw-step-title">{s.title}</h3>
                  <p className="uw-step-text">{s.text}</p>
                  <span className="uw-step-stat">{s.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE APPROACH */}
        <section className="uw-section">
          <div className="uw-label">{"// 03 — The Approach"}</div>
          <h2 className="uw-section-title">
            Teaching a model <em>the calendar</em>
          </h2>
          <p className="uw-body">
            A good forecast here isn&apos;t about a fancier algorithm — it&apos;s about
            encoding what the people answering the phones already know. The modeling
            choices all flow from one idea: demand follows the calendar, so give the
            model the calendar.
          </p>
          <div className="uw-steps">
            {modelSteps.map((s) => (
              <div key={s.step} className="uw-step">
                <div className="uw-step-num">{s.step}</div>
                <div className="uw-step-body">
                  <h3 className="uw-step-title">{s.title}</h3>
                  <p className="uw-step-text">{s.text}</p>
                  <span className="uw-step-stat">{s.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ANALYSIS */}
        <section className="uw-section uw-section-tinted">
          <div className="uw-label">{"// 04 — What the Data Shows"}</div>
          <h2 className="uw-section-title">
            The patterns the model <em>learns</em>
          </h2>
          <p className="uw-body">
            Three views from the real call history: the daily rhythm of demand, the
            yearly tax-season surge, and how the finished forecast tracks against
            actual calls it had never seen.
          </p>

          <div className="uw-analysis-grid">
            <div className="uw-analysis-card uw-analysis-wide">
              <div className="uw-analysis-head">
                <h3>Calls by hour of day</h3>
                <p>
                  Demand builds through the morning to a midday peak near 1 PM, then
                  tapers — the within-day shape the model captures with daily seasonality.
                </p>
              </div>
              <div className="uw-analysis-frame">
                <iframe
                  title="Average calls by hour of day"
                  src="/call211-charts/01_avg_by_hour.html"
                  className="uw-analysis-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            <div className="uw-analysis-card">
              <div className="uw-analysis-head">
                <h3>Daily volume over time</h3>
                <p>Red bands mark VITA tax season (Jan–Apr), where call volume reliably climbs.</p>
              </div>
              <div className="uw-analysis-frame">
                <iframe
                  title="Daily call volume over time"
                  src="/call211-charts/02_daily_volume.html"
                  className="uw-analysis-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            <div className="uw-analysis-card">
              <div className="uw-analysis-head">
                <h3>Forecast vs. actual</h3>
                <p>On the hold-out weeks, the forecast tracks real calls inside an 80% interval.</p>
              </div>
              <div className="uw-analysis-frame">
                <iframe
                  title="Forecast versus actual on the hold-out test set"
                  src="/call211-charts/03_forecast_vs_actual.html"
                  className="uw-analysis-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="uw-section">
          <div className="uw-label">{"// 05 — The Result"}</div>
          <h2 className="uw-section-title">
            Within <em>±3.5 calls an hour</em>
          </h2>
          <p className="uw-body">
            On weeks it had never seen, the model predicted hourly call volume to
            within a few calls. For a series that swings from zero to the mid-twenties
            within a single day, that&apos;s accurate enough to schedule against.
          </p>

          <div className="uw-result-row">
            <div className="uw-score-card">
              <div className="uw-score-tile">
                <div className="uw-score-num">3.5</div>
                <div className="uw-score-label">MAE — calls / hour</div>
              </div>
              <div className="uw-score-tile">
                <div className="uw-score-num">4.6</div>
                <div className="uw-score-label">RMSE — calls / hour</div>
              </div>
              <div className="uw-score-tile">
                <div className="uw-score-num">366</div>
                <div className="uw-score-label">Test hours scored</div>
              </div>
            </div>

            <div className="uw-note">
              <div className="uw-note-label">A note on MAPE</div>
              <p>
                The model&apos;s MAPE is 59.7%, which sounds alarming until you look at
                what it measures. On low-count hourly data, missing a quiet hour by
                three calls when the true value is five reads as a 60% error — even
                though three calls is operationally trivial. That&apos;s a known failure
                of percentage error on small counts, so RMSE and MAE are the honest
                headline here; MAPE is reported for completeness, not as the verdict.
              </p>
            </div>
          </div>

          <div className="uw-model-card">
            <div className="uw-model-detail">
              <span className="uw-model-key">Model</span>
              <span className="uw-model-val">Prophet (multiplicative)</span>
            </div>
            <div className="uw-model-detail">
              <span className="uw-model-key">Seasonality</span>
              <span className="uw-model-val">Daily · Weekly · Yearly</span>
            </div>
            <div className="uw-model-detail">
              <span className="uw-model-key">Regressors</span>
              <span className="uw-model-val">7 calendar features</span>
            </div>
            <div className="uw-model-detail">
              <span className="uw-model-key">Validation</span>
              <span className="uw-model-val">Hold-out test set</span>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="uw-section uw-section-tinted">
          <div className="uw-label">{"// 06 — Skills Demonstrated"}</div>
          <h2 className="uw-section-title">
            What this project <em>covers</em>
          </h2>
          <div className="uw-skills">
            {skills.map(([icon, title, text]) => (
              <div key={title as string} className="uw-skill">
                <div className="uw-skill-icon">{icon}</div>
                <div>
                  <h4 className="uw-skill-title">{title}</h4>
                  <p className="uw-skill-text">{text as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEPLOYMENT / CTA */}
        <section className="uw-section">
          <div className="uw-label">{"// 07 — In Production"}</div>
          <h2 className="uw-section-title">
            From notebook to <em>staffing tool</em>
          </h2>
          <p className="uw-body">
            A forecast nobody can use is just a number. The model is wrapped in a
            Streamlit dashboard built for the people doing the scheduling — it answers
            how many calls to expect today, across the next two weeks, and which
            upcoming day will be busiest, with a 91-day view for longer-range planning.
          </p>
          <div className="uw-cta-row">
            <a
              href="https://211-call-volume-forecasting.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="uw-cta-btn uw-cta-primary"
            >
              View Live Dashboard →
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="uw-footer">
          <p className="uw-footer-text">211 CALL VOLUME FORECASTING · UNITED WAY</p>
          <div className="uw-footer-stack">
            {["Python", "Prophet", "Pandas", "NumPy", "Plotly", "Streamlit"].map((t) => (
              <span key={t} className="uw-stack-pill">{t}</span>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        .uw-root {
          --uw-bg: #FBFBFD;
          --uw-surface: #F1F3FA;
          --uw-border: #DCE1F0;
          --uw-ink: #11161F;
          --uw-muted: #5C6577;
          --uw-blue: #0344b5;
          --uw-blue-dark: #022f7d;
          --uw-blue-light: #E3EAFB;
          --uw-red: #fd372c;
          --uw-yellow: #ffb901;
          --uw-mono: 'IBM Plex Mono', monospace;
          --uw-serif: 'DM Serif Display', serif;
          --uw-sans: 'Figtree', sans-serif;
          background: var(--uw-bg);
          color: var(--uw-ink);
          font-family: var(--uw-sans);
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }
        .uw-root *, .uw-root *::before, .uw-root *::after { box-sizing: border-box; }

        .uw-hero { padding: 10vh 8vw 8vh; border-bottom: 1px solid var(--uw-border); position: relative; }
        .uw-hero::after { content: ''; position: absolute; left: 8vw; bottom: -1px; width: 96px; height: 4px; background: linear-gradient(90deg, var(--uw-red) 0 33%, var(--uw-yellow) 33% 66%, var(--uw-blue) 66% 100%); }
        .uw-hero-inner { max-width: 820px; }
        .uw-tag { font-family: var(--uw-mono); font-size: 0.72rem; letter-spacing: 0.15em; color: var(--uw-blue); text-transform: uppercase; margin-bottom: 2rem; }
        .uw-h1 { font-family: var(--uw-serif); font-size: clamp(3rem, 7vw, 6.5rem); line-height: 1.0; color: var(--uw-ink); margin-bottom: 1.75rem; }
        .uw-h1 span { color: var(--uw-blue); font-style: italic; }
        .uw-sub { font-size: 1.1rem; color: var(--uw-muted); max-width: 60ch; line-height: 1.8; font-weight: 400; margin-bottom: 2.5rem; }
        .uw-pills { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .uw-pill { background: var(--uw-surface); border: 1px solid var(--uw-border); border-radius: 2px; padding: 0.35rem 0.85rem; font-family: var(--uw-mono); font-size: 0.75rem; color: var(--uw-muted); }

        .uw-section { padding: 7rem 8vw; border-bottom: 1px solid var(--uw-border); }
        .uw-section-tinted { background: var(--uw-surface); }
        .uw-label { font-family: var(--uw-mono); font-size: 0.68rem; letter-spacing: 0.18em; color: var(--uw-red); text-transform: uppercase; margin-bottom: 1rem; }
        .uw-section-title { font-family: var(--uw-serif); font-size: clamp(1.9rem, 3.5vw, 3rem); line-height: 1.2; color: var(--uw-ink); margin-bottom: 2rem; font-weight: 400; }
        .uw-section-title em { font-style: italic; color: var(--uw-blue); }
        .uw-body { font-size: 1.02rem; color: var(--uw-muted); max-width: 64ch; line-height: 1.85; font-weight: 400; }

        .uw-stat-row { display: flex; gap: 3.5rem; flex-wrap: wrap; margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--uw-border); }
        .uw-stat { flex: 1; min-width: 120px; }
        .uw-stat-num { font-family: var(--uw-serif); font-size: clamp(2.4rem, 4vw, 3.8rem); color: var(--uw-blue); line-height: 1; }
        .uw-stat-label { font-family: var(--uw-mono); font-size: 0.68rem; letter-spacing: 0.12em; color: var(--uw-muted); text-transform: uppercase; margin-top: 0.5rem; }
        .uw-stat-divider { width: 1px; background: var(--uw-border); align-self: stretch; }

        .uw-steps { margin-top: 3.5rem; display: flex; flex-direction: column; }
        .uw-step { display: grid; grid-template-columns: 100px 1fr; gap: 2rem; padding: 2.5rem 0; border-top: 1px solid var(--uw-border); align-items: start; }
        .uw-step:last-child { border-bottom: 1px solid var(--uw-border); }
        .uw-step-num { font-family: var(--uw-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: var(--uw-red); padding-top: 0.2rem; }
        .uw-step-title { font-family: var(--uw-serif); font-size: 1.25rem; color: var(--uw-ink); margin-bottom: 0.6rem; font-weight: 400; }
        .uw-step-text { font-size: 0.93rem; color: var(--uw-muted); line-height: 1.8; max-width: 68ch; }
        .uw-step-stat { display: inline-block; margin-top: 1rem; font-family: var(--uw-mono); font-size: 0.73rem; color: var(--uw-blue); background: var(--uw-blue-light); border: 1px solid rgba(3,68,181,0.2); padding: 0.28rem 0.7rem; border-radius: 2px; }
        @media (max-width: 600px) { .uw-step { grid-template-columns: 1fr; gap: 0.5rem; } }

        .uw-analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 3rem; }
        .uw-analysis-wide { grid-column: 1 / -1; }
        @media (max-width: 700px) { .uw-analysis-grid { grid-template-columns: 1fr; } .uw-analysis-wide { grid-column: auto; } }
        .uw-analysis-card { border: 1px solid var(--uw-border); background: var(--uw-bg); border-radius: 4px; overflow: hidden; }
        .uw-analysis-head { padding: 1rem 1.25rem; border-bottom: 1px solid var(--uw-border); }
        .uw-analysis-head h3 { font-family: var(--uw-serif); font-size: 1.1rem; color: var(--uw-ink); margin: 0; font-weight: 400; }
        .uw-analysis-head p { margin-top: 0.35rem; color: var(--uw-muted); font-size: 0.85rem; line-height: 1.6; }
        .uw-analysis-frame { position: relative; height: 320px; background: var(--uw-bg); }
        .uw-analysis-iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: var(--uw-bg); }

        .uw-result-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: stretch; margin-top: 2.5rem; }
        @media (max-width: 700px) { .uw-result-row { grid-template-columns: 1fr; } }
        .uw-score-card { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--uw-border); border-radius: 4px; overflow: hidden; }
        .uw-score-tile { padding: 1.5rem 1rem; text-align: center; border-right: 1px solid var(--uw-border); background: var(--uw-bg); }
        .uw-score-tile:last-child { border-right: none; }
        .uw-score-num { font-family: var(--uw-serif); font-size: 2.4rem; color: var(--uw-blue); line-height: 1; }
        .uw-score-label { font-family: var(--uw-mono); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--uw-muted); margin-top: 0.6rem; }
        .uw-note { background: var(--uw-bg); border: 1px solid var(--uw-border); border-left: 3px solid var(--uw-yellow); border-radius: 0 4px 4px 0; padding: 1.25rem 1.5rem; }
        .uw-note-label { font-family: var(--uw-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--uw-muted); margin-bottom: 0.6rem; }
        .uw-note p { font-size: 0.86rem; color: var(--uw-muted); line-height: 1.7; }

        .uw-model-card { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--uw-border); border: 1px solid var(--uw-border); border-radius: 4px; overflow: hidden; margin-top: 1.5rem; }
        @media (max-width: 700px) { .uw-model-card { grid-template-columns: repeat(2, 1fr); } }
        .uw-model-detail { background: var(--uw-bg); padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .uw-model-key { font-family: var(--uw-mono); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--uw-muted); }
        .uw-model-val { font-family: var(--uw-mono); font-size: 0.82rem; color: var(--uw-ink); }

        .uw-skills { display: grid; grid-template-columns: repeat(2, 1fr); margin-top: 3rem; border: 1px solid var(--uw-border); }
        @media (max-width: 700px) { .uw-skills { grid-template-columns: 1fr; } }
        .uw-skill { display: flex; gap: 1.25rem; padding: 2rem; border-right: 1px solid var(--uw-border); border-bottom: 1px solid var(--uw-border); align-items: flex-start; transition: background 0.2s; }
        .uw-skill:hover { background: var(--uw-blue-light); }
        .uw-skill:nth-child(even) { border-right: none; }
        .uw-skill-icon { font-size: 1.3rem; line-height: 1; flex-shrink: 0; padding-top: 0.1rem; }
        .uw-skill-title { font-family: var(--uw-serif); font-size: 1.05rem; color: var(--uw-ink); margin-bottom: 0.4rem; font-weight: 400; }
        .uw-skill-text { font-size: 0.875rem; color: var(--uw-muted); line-height: 1.7; }

        .uw-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.5rem; }
        .uw-cta-btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 3px; font-family: var(--uw-mono); font-size: 0.82rem; text-decoration: none; letter-spacing: 0.04em; transition: all 0.2s; }
        .uw-cta-primary { background: var(--uw-blue); color: white; border: 1px solid var(--uw-blue); }
        .uw-cta-primary:hover { background: var(--uw-blue-dark); }

        .uw-footer { padding: 3.5rem 8vw; border-top: 1px solid var(--uw-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .uw-footer-text { font-family: var(--uw-mono); font-size: 0.68rem; color: var(--uw-muted); letter-spacing: 0.1em; }
        .uw-footer-stack { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .uw-stack-pill { background: var(--uw-blue-light); border: 1px solid rgba(3,68,181,0.2); color: var(--uw-blue); font-family: var(--uw-mono); font-size: 0.65rem; padding: 0.22rem 0.6rem; border-radius: 2px; }
      `}</style>
    </>
  );
}
