//==================================================
// File name: WeatherCard.jsx
//==================================================
// Description:
// Displays the current weather summary and major weather
// metrics for the selected location.
//
// STEP 5 introduces a more professional dashboard-style
// presentation inspired by the previous weather application.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 5.0
//==================================================

/**
 * Converts Celsius to Fahrenheit.
 *
 * @param {number} celsius Temperature in Celsius.
 * @returns {number} Temperature in Fahrenheit.
 */
function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

/**
 * Formats a Celsius temperature in the selected display unit.
 *
 * @param {number} celsius Temperature in Celsius.
 * @param {string} unit Selected unit: C or F.
 *
 * @returns {string} Formatted temperature.
 */
function formatTemperature(celsius, unit) {
  const temperature =
    unit === "C"
      ? celsius
      : convertCelsiusToFahrenheit(celsius);

  return `${Math.round(temperature)}°${unit}`;
}

/**
 * Displays current weather information.
 *
 * @param {Object} props Component properties.
 * @param {string} props.city Selected city.
 * @param {Object} props.weather Current weather information.
 * @param {string} props.unit Selected temperature unit.
 * @param {Function} props.onToggleUnit Unit-toggle callback.
 *
 * @returns {JSX.Element} Current weather dashboard card.
 */
function WeatherCard({
  city,
  weather,
  unit,
  onToggleUnit,
}) {
  return (
    <section className="current-weather-card">
      <div className="current-weather-primary">
        <div
          className="weather-icon"
          aria-hidden="true"
        >
          {weather.weatherIcon}
        </div>

        <div>
          <h2>
            {city}, {weather.country}
          </h2>

          <p className="weather-condition">
            {weather.condition}
          </p>

          <p className="current-temperature">
            {formatTemperature(
              weather.temperatureCelsius,
              unit
            )}
          </p>

          <p className="feels-like">
            Feels like{" "}
            {formatTemperature(
              weather.feelsLikeCelsius,
              unit
            )}
          </p>
        </div>
      </div>

      <div className="weather-metrics">
        <div className="weather-metric">
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div className="weather-metric">
          <span>Wind</span>
          <strong>{weather.windSpeed} km/h</strong>
        </div>

        <div className="weather-metric">
          <span>UV Index</span>
          <strong>{weather.uvIndex}</strong>
        </div>

        <div className="weather-metric">
          <span>Sunrise</span>
          <strong>{weather.sunrise}</strong>
        </div>

        <div className="weather-metric">
          <span>Sunset</span>
          <strong>{weather.sunset}</strong>
        </div>
      </div>

      <button
        type="button"
        className="unit-toggle"
        onClick={onToggleUnit}
      >
        Display °{unit === "C" ? "F" : "C"}
      </button>
    </section>
  );
}

export default WeatherCard;