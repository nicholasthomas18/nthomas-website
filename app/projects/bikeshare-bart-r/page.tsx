"use client";

import { useEffect } from "react";

export default function BikeSharePage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
    script.onload = () => {
      const el = document.getElementById("rmsle-formula");
      if (el && (window as any).katex) {
        (window as any).katex.render(
          String.raw`\sqrt{\frac{1}{n} \sum_{i=1}^{n} \left(\log(p_i + 1) - \log(a_i + 1)\right)^2}`,
          el,
          { displayMode: true, throwOnError: false }
        );
      }
    };
    document.head.appendChild(script);
  }, []);

  const pipelineSteps = [
    {
      step: "STEP 01",
      title: "Loading & Cleaning the Data",
      text: "Training and test sets were loaded with vroom for fast CSV parsing. The casual and registered columns — which are components of the target count — were immediately dropped to prevent leakage. The target variable count was log-transformed to reduce right-skew and stabilize variance, a standard technique for count data with a wide range.",
      stat: "log(count) as target",
    },
    {
      step: "STEP 02",
      title: "Feature Engineering via Recipe",
      text: "A tidymodels recipe handled all preprocessing in a reproducible pipeline. The rare weather category 4 (storm) was collapsed into category 3 (bad weather) due to its near-zero occurrence. Season, weather, holiday, and workingday were re-encoded as factors. Hour of day and day of week were extracted from the datetime column — two of the strongest signals for bike demand.",
      stat: "Hour + weekday extracted",
    },
    {
      step: "STEP 03",
      title: "Correlation Filtering & Normalization",
      text: "Numeric predictors with pairwise correlation above 0.5 were automatically removed using step_corr to reduce multicollinearity. Remaining numeric features were normalized with step_normalize, dummy variables were created for all nominal predictors, and zero-variance predictors were dropped with step_zv — keeping the feature space clean before modeling.",
      stat: "Automated collinearity removal",
    },
    {
      step: "STEP 04",
      title: "BART Model + Cross-Validation",
      text: "Bayesian Additive Regression Trees (BART) was selected as the primary model via the dbarts engine. The number of trees was tuned across seven candidate values (1, 5, 10, 30, 50, 100, 200) using 2-fold cross-validation scored by RMSE. The best tree count was selected automatically via select_best.",
      stat: "7-point tree grid tuned",
    },
    {
      step: "STEP 05",
      title: "Prediction & Back-Transformation",
      text: "The finalized workflow was fit on the full training set and used to generate predictions on the held-out test data. Since the target was log-transformed during training, predictions were exponentiated back to the original count scale with exp(). A pmax(0, count) floor was applied to prevent negative predictions.",
      stat: "exp() back-transform applied",
    },
    {
      step: "STEP 06",
      title: "Kaggle Submission",
      text: "The final predictions were joined to the test datetime column, renamed to count, and written out as a properly formatted CSV using vroom_write. The submission was evaluated by Kaggle on Root Mean Squared Logarithmic Error (RMSLE), which naturally rewards the log-transform approach used during training.",
      stat: "0.39497 RMSLE on Kaggle",
    },
  ];

  const skills = [
    ["📦", "Tidymodels Pipelines", "Built a fully reproducible preprocessing and modeling workflow using tidymodels recipes and workflows, the R equivalent of sklearn pipelines."],
    ["🔢", "Target Engineering", "Applied a log-transform to the skewed count target before modeling and correctly reversed it post-prediction, aligning training objective with the RMSLE evaluation metric."],
    ["📅", "Datetime Feature Extraction", "Used lubridate to pull hour and weekday directly from raw datetime strings, which were the two most predictive signals for hourly bike demand."],
    ["🌲", "BART Regression", "Implemented Bayesian Additive Regression Trees via the dbarts engine, a non-parametric ensemble method well-suited to structured tabular regression."],
    ["🔁", "Cross-Validated Tuning", "Tuned the tree count hyperparameter across a manually specified grid using vfold_cv and tune_grid, selecting the best configuration by RMSE."],
    ["📤", "Kaggle Submission Workflow", "Handled the full competition pipeline end-to-end: processing test data through the same recipe, generating predictions, and formatting for submission."],
  ];

  return (
    <>
      <div className="bs-root">

        {/* HERO */}
        <section className="bs-hero">
          <div className="bs-hero-inner">
            <div className="bs-tag">R · Tidymodels · Kaggle Competition</div>
            <h1 className="bs-h1">
              Bike Sharing<br />
              <span>Demand Prediction</span>
            </h1>
            <p className="bs-sub">
            A Kaggle competition entry predicting hourly bike rental demand using R and Bayesian Additive Regression Trees.            </p>
            <div className="bs-pills">
              <span className="bs-pill">R</span>
              <span className="bs-pill">Kaggle</span>
              <span className="bs-pill">Tidyverse</span>
              <span className="bs-pill">Tidymodels</span>
              <span className="bs-pill">BART</span>
              <span className="bs-pill">Predictive Analytics</span>
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="bs-section">
          <div className="bs-label">{"// 01 — The Problem"}</div>
          <h2 className="bs-section-title">
            Predicting when people rent bikes<br />
            <em>down to the hour.</em>
          </h2>
          <p className="bs-body">
            The{" "}
            <a
              href="https://www.kaggle.com/competitions/bike-sharing-demand/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="bs-link"
            >
              Kaggle Bike Sharing Demand competition
            </a>{" "}
            provides two years of hourly rental data from Washington D.C.&apos;s
            Capital Bikeshare system, along with weather and seasonal
            information. The task is to predict total rental count for each hour
            in the test set. 
            <br /> <br />
            Submissions are scored on RMSLE, which measures how far off 
            predictions are relative to their size — not just by raw count. So being 
            off by 10 on a slow hour hurts just as much as being off by 100 on a busy one.
          </p>

          <div className="bs-stat-row">
            <div className="bs-stat">
              <div className="bs-stat-num bs-stat-green">0.395</div>
              <div className="bs-stat-label">RMSLE Score</div>
            </div>
            <div className="bs-stat-divider" />
            <div className="bs-stat">
              <div className="bs-stat-num bs-stat-green">6</div>
              <div className="bs-stat-label">Pipeline Steps</div>
            </div>
            <div className="bs-stat-divider" />
            <div className="bs-stat">
              <div className="bs-stat-num bs-stat-green">200</div>
              <div className="bs-stat-label">Trees Tested</div>
            </div>
            <div className="bs-stat-divider" />
            <div className="bs-stat">
              <div className="bs-stat-num bs-stat-green">BART</div>
              <div className="bs-stat-label">Final Model</div>
            </div>
          </div>
        </section>

        {/* PIPELINE */}
        <section className="bs-section bs-section-tinted">
          <div className="bs-label">{"// 02 — The Pipeline"}</div>
          <h2 className="bs-section-title">
            The modeling pipeline <em>step by step</em>
          </h2>
          <div className="bs-steps">
            {pipelineSteps.map((s) => (
              <div key={s.step} className="bs-step">
                <div className="bs-step-num">{s.step}</div>
                <div className="bs-step-body">
                  <h3 className="bs-step-title">{s.title}</h3>
                  <p className="bs-step-text">{s.text}</p>
                  <span className="bs-step-stat">{s.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESULT */}
        <section className="bs-section">
          <div className="bs-label">{"// 03 — Result"}</div>
          <h2 className="bs-section-title">
            Final score: <em>0.39497 RMSLE</em>
          </h2>
          <p className="bs-body">
            Submissions are evaluated on Root Mean Squared Logarithmic Error.
            RMSLE measures the ratio between predicted and actual values on a log
            scale. It doesn&apos;t let large counts dominate the error, and rewards
            proportional accuracy. A lower score is better. For reference, mean model score was 0.6905
          </p>

          <div className="bs-result-row">
            <div className="bs-equation">
              <div className="bs-equation-label">RMSLE Formula</div>
              <div id="rmsle-formula" className="bs-equation-math" />
              <div className="bs-equation-legend">
                <span><em>n</em> = number of hours in the test set</span>
                <span><em>p<sub>i</sub></em> = predicted count</span>
                <span><em>a<sub>i</sub></em> = actual count</span>
                <br />
              </div>
            </div>

            <div className="bs-score-card">
              <div className="bs-score-left">
                <div className="bs-score-label">Kaggle RMSLE</div>
                <div className="bs-score-num">0.39497</div>
                <div className="bs-score-sub">Root Mean Squared Logarithmic Error</div>
              </div>
              <div className="bs-score-right">
                <div className="bs-score-detail">
                  <span className="bs-score-key">Model</span>
                  <span className="bs-score-val">BART (dbarts)</span>
                </div>

                <div className="bs-score-detail">
                  <span className="bs-score-key">Tuning</span>
                  <span className="bs-score-val">2-fold CV, 7 tree values</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bs-leaderboard">
            <h3 className="bs-lb-title">Model Comparison</h3>
            <p className="bs-lb-sub">All models ranked by RMSLE (lower is better).</p>
            <table className="bs-lb-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>RMSLE</th>
                  <th>Error Bar</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: "Bayesian Additive Regression Trees", score: "0.39497", pct: 26.5, best: true },
                  { model: "DataRobot", score: "0.42621", pct: 28.6 },
                  { model: "Random Forest", score: "0.44501", pct: 29.8 },
                  { model: "Linear Regression", score: "1.18643", pct: 79.5 },
                  { model: "Ridge Regression", score: "1.48730", pct: 100 },
                ].map((row) => (
                  <tr key={row.model} className={row.best ? "bs-lb-best" : ""}>
                    <td>
                      {row.model}
                      {row.best && <span className="bs-lb-badge">BEST</span>}
                    </td>
                    <td className="bs-lb-score">{row.score}</td>
                    <td className="bs-lb-bar-cell">
                      <div className="bs-lb-track">
                        <div
                          className={`bs-lb-fill ${row.best ? "bs-lb-fill-best" : ""}`}
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ANALYSIS */}
        <section className="bs-section">
          <div className="bs-label">{"// 04 — Analysis"}</div>
          <h2 className="bs-section-title">
            What the data <em>tells us</em>
          </h2>
          <p className="bs-body">
            Three views from the training data that shaped the modeling choices:
            the daily rhythm of demand, how season and weather move it, and why
            the count target gets log-transformed before fitting.
          </p>

          <div className="bs-analysis-grid">
            <div className="bs-analysis-card bs-analysis-wide">
              <div className="bs-analysis-head">
                <h3>Demand by hour of day</h3>
                <p>
                  Working days show sharp commuter peaks at 8am and 5–6pm;
                  weekends spread demand across midday. Hour was the single
                  strongest predictor.
                </p>
              </div>
              <div className="bs-analysis-frame">
                <iframe
                  title="Average rentals by hour of day"
                  src="/bikeshare-charts/01_demand_by_hour.html"
                  className="bs-analysis-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            <div className="bs-analysis-card">
              <div className="bs-analysis-head">
                <h3>Season &amp; weather</h3>
                <p>Demand climbs in fall and summer and drops in poor weather.</p>
              </div>
              <div className="bs-analysis-frame">
                <iframe
                  title="Average rentals by season and weather"
                  src="/bikeshare-charts/02_demand_by_season_weather.html"
                  className="bs-analysis-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            <div className="bs-analysis-card">
              <div className="bs-analysis-head">
                <h3>Why log-transform</h3>
                <p>Raw count is heavily right-skewed; the log makes it near-symmetric.</p>
              </div>
              <div className="bs-analysis-frame">
                <iframe
                  title="Target distribution: raw count vs log count"
                  src="/bikeshare-charts/03_target_distribution.html"
                  className="bs-analysis-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="bs-section bs-section-tinted">
          <div className="bs-label">{"// 05 — Skills Demonstrated"}</div>
          <h2 className="bs-section-title">
            What this project <em>covers</em>
          </h2>
          <div className="bs-skills">
            {skills.map(([icon, title, text]) => (
              <div key={title as string} className="bs-skill">
                <div className="bs-skill-icon">{icon}</div>
                <div>
                  <h4 className="bs-skill-title">{title}</h4>
                  <p className="bs-skill-text">{text as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bs-section">
          <div className="bs-label">{"// 06 — Run It Yourself"}</div>
          <h2 className="bs-section-title">
            See the code and <em>try it out</em>
          </h2>
          <p className="bs-body">
            The full R script is on GitHub, and the data is publicly available
            through the Kaggle competition page. Click below to see for yourself.
          </p>
          <div className="bs-cta-row">
            <a
              href="https://github.com/nicholasthomas18/KaggleBikeShare"
              target="_blank"
              rel="noopener noreferrer"
              className="bs-cta-btn bs-cta-primary"
            >
              GitHub Repository →
            </a>
            <a
              href="https://www.kaggle.com/competitions/bike-sharing-demand/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="bs-cta-btn bs-cta-secondary"
            >
              Kaggle Competition →
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bs-footer">
          <p className="bs-footer-text">BIKE SHARE DEMAND · KAGGLE COMPETITION · R</p>
          <div className="bs-footer-stack">
            {["R", "tidymodels", "tidyverse", "vroom", "ranger", "BART", "Predictive Analytics"].map((t) => (
              <span key={t} className="bs-stack-pill">{t}</span>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        .bs-root {
          --bs-bg: #FAFAF7;
          --bs-surface: #F2F1EC;
          --bs-border: #D9D7CF;
          --bs-ink: #1A1A18;
          --bs-muted: #6B6B66;
          --bs-accent: #2D6A4F;
          --bs-accent-dark: #1B4332;
          --bs-accent-light: #D1FAE5;
          --bs-accent-mid: #52B788;
          --bs-mono: 'IBM Plex Mono', monospace;
          --bs-serif: 'DM Serif Display', serif;
          --bs-sans: 'Figtree', sans-serif;
          background: var(--bs-bg);
          color: var(--bs-ink);
          font-family: var(--bs-sans);
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }
        .bs-root *, .bs-root *::before, .bs-root *::after { box-sizing: border-box; }

        .bs-hero { padding: 10vh 8vw 8vh; border-bottom: 1px solid var(--bs-border); }
        .bs-hero-inner { max-width: 820px; }
        .bs-tag { font-family: var(--bs-mono); font-size: 0.72rem; letter-spacing: 0.15em; color: var(--bs-accent-mid); text-transform: uppercase; margin-bottom: 2rem; }
        .bs-h1 { font-family: var(--bs-serif); font-size: clamp(3rem, 7vw, 6.5rem); line-height: 1.0; color: var(--bs-ink); margin-bottom: 1.75rem; }
        .bs-h1 span { color: var(--bs-accent); font-style: italic; }
        .bs-sub { font-size: 1.1rem; color: var(--bs-muted); max-width: 56ch; line-height: 1.8; font-weight: 400; margin-bottom: 2.5rem; }
        .bs-pills { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .bs-pill { background: var(--bs-surface); border: 1px solid var(--bs-border); border-radius: 2px; padding: 0.35rem 0.85rem; font-family: var(--bs-mono); font-size: 0.75rem; color: var(--bs-muted); }
        .bs-pill-accent { background: var(--bs-accent-light); border-color: rgba(45,106,79,0.25); color: var(--bs-accent); font-weight: 500; }

        .bs-section { padding: 7rem 8vw; border-bottom: 1px solid var(--bs-border); }
        .bs-section-tinted { background: var(--bs-surface); }
        .bs-label { font-family: var(--bs-mono); font-size: 0.68rem; letter-spacing: 0.18em; color: var(--bs-accent-mid); text-transform: uppercase; margin-bottom: 1rem; }
        .bs-section-title { font-family: var(--bs-serif); font-size: clamp(1.9rem, 3.5vw, 3rem); line-height: 1.2; color: var(--bs-ink); margin-bottom: 2rem; font-weight: 400; }
        .bs-section-title em { font-style: italic; color: var(--bs-accent); }
        .bs-body { font-size: 1.02rem; color: var(--bs-muted); max-width: 62ch; line-height: 1.85; font-weight: 400; }
        .bs-link { color: var(--bs-accent); text-decoration: underline; text-underline-offset: 3px; }
        .bs-link:hover { color: var(--bs-accent-mid); }

        .bs-stat-row { display: flex; gap: 3.5rem; flex-wrap: wrap; margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--bs-border); }
        .bs-stat { flex: 1; min-width: 120px; }
        .bs-stat-num { font-family: var(--bs-serif); font-size: clamp(2.4rem, 4vw, 3.8rem); color: var(--bs-ink); line-height: 1; }
        .bs-stat-green { color: var(--bs-accent); }
        .bs-stat-label { font-family: var(--bs-mono); font-size: 0.68rem; letter-spacing: 0.12em; color: var(--bs-muted); text-transform: uppercase; margin-top: 0.5rem; }
        .bs-stat-divider { width: 1px; background: var(--bs-border); align-self: stretch; }

        .bs-steps { margin-top: 3.5rem; display: flex; flex-direction: column; }
        .bs-step { display: grid; grid-template-columns: 100px 1fr; gap: 2rem; padding: 2.5rem 0; border-top: 1px solid var(--bs-border); align-items: start; }
        .bs-step:last-child { border-bottom: 1px solid var(--bs-border); }
        .bs-step-num { font-family: var(--bs-mono); font-size: 0.68rem; letter-spacing: 0.15em; color: var(--bs-accent-mid); padding-top: 0.2rem; }
        .bs-step-title { font-family: var(--bs-serif); font-size: 1.25rem; color: var(--bs-ink); margin-bottom: 0.6rem; font-weight: 400; }
        .bs-step-text { font-size: 0.93rem; color: var(--bs-muted); line-height: 1.8; max-width: 68ch; }
        .bs-step-stat { display: inline-block; margin-top: 1rem; font-family: var(--bs-mono); font-size: 0.73rem; color: var(--bs-accent); background: var(--bs-accent-light); border: 1px solid rgba(45,106,79,0.2); padding: 0.28rem 0.7rem; border-radius: 2px; }
        @media (max-width: 600px) { .bs-step { grid-template-columns: 1fr; gap: 0.5rem; } }

        .bs-result-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; margin-top: 2.5rem; margin-bottom: 0.5rem; }
        @media (max-width: 700px) { .bs-result-row { grid-template-columns: 1fr; } }
        .bs-equation { background: var(--bs-surface); border: 1px solid var(--bs-border); border-left: 3px solid var(--bs-accent-mid); border-radius: 0 4px 4px 0; padding: 1.5rem 1.75rem; }
        .bs-equation-label { font-family: var(--bs-mono); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--bs-accent-mid); margin-bottom: 1rem; }
        .bs-equation-math { color: var(--bs-ink); min-height: 2.5rem; overflow: hidden; }
        .bs-equation-math .katex-display { margin: 0; }
        .bs-equation-math .katex { color: var(--bs-ink); font-size: clamp(0.7rem, 2vw, 0.95rem); }
        .bs-equation-legend { display: flex; gap: 1.25rem; flex-wrap: wrap; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--bs-border); font-family: var(--bs-mono); font-size: 0.7rem; color: var(--bs-muted); }
        .bs-equation-legend em { font-style: italic; color: var(--bs-accent); }

        .bs-score-card { display: grid; grid-template-columns: 1fr; border: 1px solid var(--bs-border); border-radius: 4px; overflow: hidden; }
        .bs-score-left { background: var(--bs-accent); color: white; padding: 1.25rem 1.5rem; text-align: center; }
        .bs-score-label { font-family: var(--bs-mono); font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; margin-bottom: 0.75rem; }
        .bs-score-num { font-family: var(--bs-serif); font-size: 2.2rem; line-height: 1; margin-bottom: 0.4rem; }
        .bs-score-sub { font-family: var(--bs-mono); font-size: 0.68rem; opacity: 0.55; line-height: 1.5; }
        .bs-score-right { background: var(--bs-bg); padding: 1rem 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
        .bs-score-detail { display: flex; flex-direction: column; gap: 0.1rem; }
        .bs-score-key { font-family: var(--bs-mono); font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--bs-muted); }
        .bs-score-val { font-family: var(--bs-mono); font-size: 0.85rem; color: var(--bs-ink); }

        .bs-leaderboard { margin-top: 3.5rem; max-width: 720px; }
        .bs-lb-title { font-family: var(--bs-serif); font-size: 1.25rem; color: var(--bs-ink); margin-bottom: 0.35rem; }
        .bs-lb-sub { font-size: 0.88rem; color: var(--bs-muted); margin-bottom: 1.5rem; }
        .bs-lb-table { width: 100%; border-collapse: collapse; }
        .bs-lb-table thead tr { border-bottom: 2px solid var(--bs-accent-mid); }
        .bs-lb-table thead th { font-family: var(--bs-mono); font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--bs-muted); padding: 0.6rem 1rem; text-align: left; font-weight: 400; }
        .bs-lb-table tbody tr { border-bottom: 1px solid var(--bs-border); transition: background 0.2s; }
        .bs-lb-table tbody tr:hover { background: rgba(45,106,79,0.04); }
        .bs-lb-table tbody td { padding: 0.85rem 1rem; font-size: 0.9rem; color: var(--bs-muted); }
        .bs-lb-table tbody td:first-child { color: var(--bs-ink); font-family: var(--bs-sans); font-weight: 400; }
        .bs-lb-score { font-family: var(--bs-mono); font-size: 0.85rem; }
        .bs-lb-best td { color: var(--bs-ink) !important; }
        .bs-lb-best td:first-child { color: var(--bs-accent) !important; font-weight: 500; }
        .bs-lb-badge { display: inline-block; background: var(--bs-accent-light); border: 1px solid rgba(45,106,79,0.25); color: var(--bs-accent); font-family: var(--bs-mono); font-size: 0.58rem; letter-spacing: 0.1em; padding: 0.12rem 0.45rem; border-radius: 2px; margin-left: 0.5rem; vertical-align: middle; }
        .bs-lb-bar-cell { width: 120px; }
        .bs-lb-track { height: 4px; background: var(--bs-border); border-radius: 2px; }
        .bs-lb-fill { height: 100%; background: var(--bs-muted); border-radius: 2px; transition: width 1s ease; }
        .bs-lb-fill-best { background: var(--bs-accent); }

        .bs-analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 3rem; }
        .bs-analysis-wide { grid-column: 1 / -1; }
        @media (max-width: 700px) { .bs-analysis-grid { grid-template-columns: 1fr; } .bs-analysis-wide { grid-column: auto; } }
        .bs-analysis-card { border: 1px solid var(--bs-border); background: var(--bs-surface); border-radius: 4px; overflow: hidden; }
        .bs-analysis-head { padding: 1rem 1.25rem; border-bottom: 1px solid var(--bs-border); }
        .bs-analysis-head h3 { font-family: var(--bs-serif); font-size: 1.1rem; color: var(--bs-ink); margin: 0; font-weight: 400; }
        .bs-analysis-head p { margin-top: 0.35rem; color: var(--bs-muted); font-size: 0.85rem; line-height: 1.6; }
        .bs-analysis-frame { position: relative; height: 300px; background: var(--bs-bg); }
        .bs-analysis-iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: var(--bs-bg); }

        .bs-skills { display: grid; grid-template-columns: repeat(2, 1fr); margin-top: 3rem; border: 1px solid var(--bs-border); }
        @media (max-width: 700px) { .bs-skills { grid-template-columns: 1fr; } }
        .bs-skill { display: flex; gap: 1.25rem; padding: 2rem; border-right: 1px solid var(--bs-border); border-bottom: 1px solid var(--bs-border); align-items: flex-start; transition: background 0.2s; }
        .bs-skill:hover { background: var(--bs-accent-light); }
        .bs-skill:nth-child(even) { border-right: none; }
        .bs-skill-icon { font-size: 1.3rem; line-height: 1; flex-shrink: 0; padding-top: 0.1rem; }
        .bs-skill-title { font-family: var(--bs-serif); font-size: 1.05rem; color: var(--bs-ink); margin-bottom: 0.4rem; font-weight: 400; }
        .bs-skill-text { font-size: 0.875rem; color: var(--bs-muted); line-height: 1.7; }

        .bs-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.5rem; }
        .bs-cta-btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 3px; font-family: var(--bs-mono); font-size: 0.82rem; text-decoration: none; letter-spacing: 0.04em; transition: all 0.2s; }
        .bs-cta-primary { background: var(--bs-accent); color: white; border: 1px solid var(--bs-accent); }
        .bs-cta-primary:hover { background: var(--bs-accent-dark); }
        .bs-cta-secondary { background: transparent; color: var(--bs-accent); border: 1px solid var(--bs-accent); }
        .bs-cta-secondary:hover { background: var(--bs-accent-light); }

        .bs-footer { padding: 3.5rem 8vw; border-top: 1px solid var(--bs-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .bs-footer-text { font-family: var(--bs-mono); font-size: 0.68rem; color: var(--bs-muted); letter-spacing: 0.1em; }
        .bs-footer-stack { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .bs-stack-pill { background: var(--bs-accent-light); border: 1px solid rgba(45,106,79,0.2); color: var(--bs-accent); font-family: var(--bs-mono); font-size: 0.65rem; padding: 0.22rem 0.6rem; border-radius: 2px; }
      `}</style>
    </>
  );
}
