// ============================================================
// File name: HourlyForecast.jsx
// ============================================================
// Objective:
// Display the next twelve normalized hourly forecast entries.
//
// Responsibilities:
// 1. Receive normalized hourly weather objects from App.jsx.
// 2. Render data using React .map().
// 3. Display local forecast hour.
// 4. Display WMO-derived weather symbol/condition.
// 5. Display temperature using the shared C/F unit.
//
// Important:
// The service layer already selects the next twelve hours.
// This presentation component does not know Open-Meteo's
// parallel-array response format.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 6.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";


/**
 * Hourly forecast presentation component.
 *
 * @param {Object} props
 * @param {Object[]} props.forecast
 * Array of normalized hourly weather objects.
 * @param {"C"|"F"} props.unit
 * Active temperature unit.
 *
 * @returns {JSX.Element}
 * Next-hours forecast section.
 */
function HourlyForecast({
  forecast,
  unit,
}) {
  return (
    <section
      className="
        forecast-section
      "
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
                  hour
                    .weatherSymbol
                }
              </div>

              <p
                className="
                  hourly-condition
                "
              >
                {
                  hour
                    .condition
                }
              </p>

              <strong
                className="
                  hourly-temperature
                "
              >
                {formatTemperature(
                  hour
                    .temperatureCelsius,
                  unit
                )}
              </strong>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default HourlyForecast;