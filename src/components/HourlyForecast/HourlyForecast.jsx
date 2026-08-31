//==================================================
// File name: HourlyForecast.jsx
//==================================================
// Description:
// Displays a horizontally scrollable short-term forecast.
//
// STEP 5 uses sample forecast data to establish the
// presentation architecture. Live forecast data will replace
// the sample data in a later step.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 5.0
//==================================================

/**
 * Converts Celsius to the requested unit.
 *
 * @param {number} celsius Temperature in Celsius.
 * @param {string} unit Selected display unit.
 *
 * @returns {number} Rounded display temperature.
 */
function convertTemperature(celsius, unit) {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32);
  }

  return Math.round(celsius);
}

/**
 * Renders the short-term hourly forecast.
 *
 * @param {Object} props Component properties.
 * @param {Array<Object>} props.forecast Hourly forecast records.
 * @param {string} props.unit Selected display unit.
 *
 * @returns {JSX.Element} Hourly forecast section.
 */
function HourlyForecast({ forecast, unit }) {
  return (
    <section className="forecast-section">
      <div className="section-heading">
        <h2>Next Hours</h2>

        <span className="section-caption">
          Sample forecast
        </span>
      </div>

      <div className="hourly-forecast">
        {forecast.map((hour) => (
          <article
            className="hourly-card"
            key={hour.time}
          >
            <p className="forecast-time">
              {hour.time}
            </p>

            <div
              className="forecast-icon"
              aria-hidden="true"
            >
              {hour.condition}
            </div>

            <strong>
              {convertTemperature(
                hour.temperatureCelsius,
                unit
              )}
              °{unit}
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;