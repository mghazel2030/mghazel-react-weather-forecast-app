//==================================================
// File name: WeatherCard.jsx
//==================================================
// Description:
// Displays dynamic weather information received from App.jsx
// through React props.
//
// STEP 3 demonstrates:
// - props
// - derived values
// - conditional rendering
// - parent-to-child data flow
// - callback props
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 3.0
//==================================================

/**
 * Renders weather information for the selected city.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.city - Selected city.
 * @param {Object} props.weather - Weather information.
 * @param {number} props.weather.temperatureCelsius
 * Temperature in Celsius.
 * @param {number} props.weather.humidity
 * Relative humidity percentage.
 * @param {number} props.weather.windSpeed
 * Wind speed in kilometres per hour.
 * @param {string} props.weather.condition
 * Human-readable weather condition.
 * @param {string} props.unit
 * Temperature unit: "C" or "F".
 * @param {Function} props.onToggleUnit
 * Callback for changing the temperature unit.
 *
 * @returns {JSX.Element} The weather information card.
 */
function WeatherCard({
  city,
  weather,
  unit,
  onToggleUnit,
}) {
  /**
   * Converts Celsius to Fahrenheit.
   *
   * @param {number} celsius - Temperature in Celsius.
   * @returns {number} Temperature in Fahrenheit.
   */
  function convertCelsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  const displayedTemperature =
    unit === "C"
      ? weather.temperatureCelsius
      : convertCelsiusToFahrenheit(
          weather.temperatureCelsius
        );

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <div>
          <h2>Weather Information</h2>
          <h3>{city}</h3>
        </div>

        <button
          type="button"
          onClick={onToggleUnit}
        >
          Show °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      <div className="weather-details">
        <p>
          <strong>Temperature:</strong>{" "}
          {displayedTemperature.toFixed(1)} °{unit}
        </p>

        <p>
          <strong>Humidity:</strong>{" "}
          {weather.humidity}%
        </p>

        <p>
          <strong>Wind Speed:</strong>{" "}
          {weather.windSpeed} km/h
        </p>

        <p>
          <strong>Conditions:</strong>{" "}
          {weather.condition}
        </p>
      </div>
    </section>
  );
}

export default WeatherCard;