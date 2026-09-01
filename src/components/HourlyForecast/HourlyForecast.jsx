// ============================================================
// File name: HourlyForecast.jsx
// ============================================================
// Objective:
// Display the next 12 hours of live forecast data.
//
// FINAL-TOUCHES:
// - Scoped CSS Module.
// - Responsive horizontal scrolling.
// - Improved semantic labeling.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";

import styles from
  "./HourlyForecast.module.css";


function HourlyForecast({
  forecast,
  unit,
}) {
  return (
    <section
      className={
        styles.section
      }
      aria-labelledby="
        hourly-forecast-heading
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
          Hourly Outlook
        </p>

        <h2
          id="
            hourly-forecast-heading
          "
        >
          Next 12 Hours
        </h2>
      </header>

      <div
        className={
          styles.list
        }
        role="list"
        aria-label="
          Twelve-hour weather
          forecast
        "
      >
        {forecast.map(
          (hour) => (
            <article
              className={
                styles.card
              }
              key={hour.id}
              role="listitem"
              title={
                hour.condition
              }
            >
              <p
                className={
                  styles.time
                }
              >
                {hour.time}
              </p>

              <div
                className={
                  styles.symbol
                }
                aria-hidden="true"
              >
                {
                  hour
                    .weatherSymbol
                }
              </div>

              <strong>
                {formatTemperature(
                  hour
                    .temperatureCelsius,
                  unit
                )}
              </strong>

              <div
                className={
                  styles.metrics
                }
              >
                <span>
                  💧{" "}
                  {hour.humidity}%
                </span>

                <span>
                  ☔{" "}
                  {
                    hour
                      .precipitationProbability
                  }%
                </span>
              </div>

              <span
                className="sr-only"
              >
                {hour.condition}
              </span>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default HourlyForecast;