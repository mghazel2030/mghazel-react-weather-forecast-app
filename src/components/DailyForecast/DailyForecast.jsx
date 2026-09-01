// ============================================================
// File name: DailyForecast.jsx
// ============================================================
// Objective:
// Present a seven-day forecast with weather condition,
// high/low temperatures, and precipitation probability.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";


function DailyForecast({
  forecast,
  unit,
}) {
  return (
    <section
      className="forecast-section"
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
                  {day.condition}
                </span>
              </div>

              <span
                className="
                  daily-rain
                "
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
                className="
                  daily-temperatures
                "
              >
                <strong>
                  {formatTemperature(
                    day.highCelsius,
                    unit
                  )}
                </strong>

                <span>
                  {formatTemperature(
                    day.lowCelsius,
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