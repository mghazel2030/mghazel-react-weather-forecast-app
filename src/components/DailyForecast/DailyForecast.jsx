// ============================================================
// File name: DailyForecast.jsx
// ============================================================
// Objective:
// Display the seven-day normalized Open-Meteo forecast.
//
// Responsibilities:
// 1. Render normalized daily forecast records.
// 2. Display date.
// 3. Display WMO-derived condition/symbol.
// 4. Display high and low temperatures.
// 5. Respect the application's shared Celsius/Fahrenheit unit.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 6.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";


/**
 * Seven-day forecast presentation component.
 *
 * @param {Object} props
 * @param {Object[]} props.forecast
 * Normalized daily forecast data.
 * @param {"C"|"F"} props.unit
 * Active temperature unit.
 *
 * @returns {JSX.Element}
 * Daily forecast section.
 */
function DailyForecast({
  forecast,
  unit,
}) {
  return (
    <section
      className="
        forecast-section
      "
      aria-labelledby="
        daily-forecast-heading
      "
    >
      <div
        className="
          forecast-section-header
        "
      >
        <div>
          <p
            className="
              section-eyebrow
            "
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
        </div>
      </div>

      <div
        className="
          daily-forecast-list
        "
      >
        {forecast.map(
          (day) => (
            <article
              className="
                daily-forecast-row
              "
              key={day.id}
            >
              <div
                className="
                  daily-date
                "
              >
                <strong>
                  {day.day}
                </strong>
              </div>

              <div
                className="
                  daily-condition
                "
              >
                <span
                  className="
                    forecast-symbol
                  "
                  aria-hidden="true"
                >
                  {
                    day
                      .weatherSymbol
                  }
                </span>

                <span>
                  {
                    day
                      .condition
                  }
                </span>
              </div>

              <div
                className="
                  daily-temperatures
                "
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