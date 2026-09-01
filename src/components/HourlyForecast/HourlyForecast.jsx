// ============================================================
// File name: HourlyForecast.jsx
// ============================================================
// Objective:
// Display the next 12 hours of weather including temperature,
// humidity, precipitation probability, and condition.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";


function HourlyForecast({
  forecast,
  unit,
}) {
  return (
    <section
      className="forecast-section"
      aria-labelledby="
        hourly-forecast-heading
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
            Hourly Outlook
          </p>

          <h2
            id="
              hourly-forecast-heading
            "
          >
            Next 12 Hours
          </h2>
        </div>
      </div>

      <div
        className="
          hourly-forecast-list
        "
      >
        {forecast.map(
          (hour) => (
            <article
              className="
                hourly-forecast-card
              "
              key={hour.id}
              title={
                hour.condition
              }
            >
              <p
                className="
                  hourly-time
                "
              >
                {hour.time}
              </p>

              <div
                className="
                  forecast-symbol
                "
                aria-hidden="true"
              >
                {
                  hour.weatherSymbol
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
                className="
                  hourly-mini-metrics
                "
              >
                <span>
                  💧 {hour.humidity}%
                </span>

                <span>
                  ☔{" "}
                  {
                    hour
                      .precipitationProbability
                  }%
                </span>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default HourlyForecast;