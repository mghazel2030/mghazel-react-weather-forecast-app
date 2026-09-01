// ============================================================
// File name: DailyForecast.jsx
// ============================================================
// Objective:
// Present the seven-day weather outlook.
//
// FINAL-TOUCHES:
// - Scoped CSS Module.
// - Improved responsive layout.
// - More descriptive accessibility text.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";

import styles from
  "./DailyForecast.module.css";


function DailyForecast({
  forecast,
  unit,
}) {
  return (
    <section
      className={
        styles.section
      }
      aria-labelledby="
        daily-forecast-heading
      "
    >
      <header
        className={
          styles.header
        }
      >
        <p
          className={
            styles.eyebrow
          }
        >
          Weekly Outlook
        </p>

        <h2
          id="
            daily-forecast-heading
          "
        >
          7-Day Forecast
        </h2>
      </header>

      <div
        className={
          styles.list
        }
      >
        {forecast.map(
          (day) => (
            <article
              className={
                styles.row
              }
              key={day.id}
              aria-label={
                `${day.day}: ${day.condition}, high ${formatTemperature(
                  day.highCelsius,
                  unit
                )}, low ${formatTemperature(
                  day.lowCelsius,
                  unit
                )}, precipitation probability ${day.precipitationProbability}%`
              }
            >
              <div
                className={
                  styles.date
                }
              >
                <strong>
                  {day.day}
                </strong>
              </div>

              <div
                className={
                  styles.condition
                }
              >
                <span
                  className={
                    styles.symbol
                  }
                  aria-hidden="true"
                >
                  {
                    day
                      .weatherSymbol
                  }
                </span>

                <span>
                  {day.condition}
                </span>
              </div>

              <span
                className={
                  styles.rain
                }
                title="
                  Maximum precipitation
                  probability
                "
              >
                ☔{" "}
                {
                  day
                    .precipitationProbability
                }%
              </span>

              <div
                className={
                  styles.temperatures
                }
              >
                <strong>
                  {formatTemperature(
                    day
                      .highCelsius,
                    unit
                  )}
                </strong>

                <span>
                  {formatTemperature(
                    day
                      .lowCelsius,
                    unit
                  )}
                </span>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default DailyForecast;