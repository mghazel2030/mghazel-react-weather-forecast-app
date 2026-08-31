//==================================================
// File name: DailyForecast.jsx
//==================================================
// Description:
// Displays a seven-day forecast summary.
//
// STEP 5 establishes the visual and component architecture
// using sample data. A later step will populate this component
// from live forecast data.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 5.0
//==================================================

/**
 * Converts Celsius to the selected unit.
 *
 * @param {number} celsius Celsius temperature.
 * @param {string} unit Selected temperature unit.
 *
 * @returns {number} Rounded temperature.
 */
function convertTemperature(celsius, unit) {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32);
  }

  return Math.round(celsius);
}

/**
 * Renders the seven-day forecast.
 *
 * @param {Object} props Component properties.
 * @param {Array<Object>} props.forecast Daily forecast records.
 * @param {string} props.unit Selected temperature unit.
 *
 * @returns {JSX.Element} Daily forecast interface.
 */
function DailyForecast({ forecast, unit }) {
  return (
    <section className="forecast-section">
      <div className="section-heading">
        <h2>7-Day Forecast</h2>

        <span className="section-caption">
          Sample forecast
        </span>
      </div>

      <div className="daily-forecast">
        {forecast.map((day) => (
          <article
            className="daily-forecast-row"
            key={day.day}
          >
            <div className="daily-forecast-day">
              <span
                className="forecast-icon"
                aria-hidden="true"
              >
                {day.condition}
              </span>

              <span>{day.day}</span>
            </div>

            <div className="daily-temperatures">
              <strong>
                {convertTemperature(
                  day.highCelsius,
                  unit
                )}
                °
              </strong>

              <span>
                {convertTemperature(
                  day.lowCelsius,
                  unit
                )}
                °
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;