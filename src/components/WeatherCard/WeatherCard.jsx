// ============================================================
// File name: WeatherCard.jsx
// ============================================================
// Objective:
// Present current normalized weather information.
//
// Responsibilities:
// 1. Display location.
// 2. Display current weather condition.
// 3. Display current temperature.
// 4. Display apparent/"feels like" temperature.
// 5. Display humidity.
// 6. Display wind speed.
// 7. Display today's maximum UV index.
// 8. Display sunrise and sunset.
// 9. Provide the Celsius/Fahrenheit toggle.
//
// Design Principle:
// This component does not understand Open-Meteo's raw JSON.
// It consumes the normalized application weather model.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 6.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";


/**
 * Current-weather presentation component.
 *
 * @param {Object} props
 * @param {string} props.city
 * Human-readable location.
 * @param {Object} props.weather
 * Normalized current-weather object.
 * @param {"C"|"F"} props.unit
 * Active temperature display unit.
 * @param {Function} props.onToggleUnit
 * Parent callback for changing temperature units.
 *
 * @returns {JSX.Element}
 * Current-weather card.
 */
function WeatherCard({
  city,
  weather,
  unit,
  onToggleUnit,
}) {
  return (
    <section
      className="
        current-weather-card
      "
      aria-labelledby="
        current-weather-heading
      "
    >
      <div
        className="
          current-weather-primary
        "
      >
        <div
          className="weather-symbol"
          aria-hidden="true"
        >
          {weather.weatherSymbol}
        </div>

        <div
          className="
            current-weather-summary
          "
        >
          <p
            className="
              current-weather-label
            "
          >
            Current Weather
          </p>

          <h2
            id="
              current-weather-heading
            "
          >
            {city}
          </h2>

          <p
            className="
              weather-condition
            "
          >
            {weather.condition}
          </p>

          <p
            className="
              current-temperature
            "
          >
            {formatTemperature(
              weather
                .temperatureCelsius,
              unit
            )}
          </p>

          <p
            className="
              feels-like
            "
          >
            Feels like{" "}
            {formatTemperature(
              weather
                .feelsLikeCelsius,
              unit
            )}
          </p>
        </div>
      </div>

      <div
        className="
          current-weather-details
        "
      >
        <div
          className="weather-metric"
        >
          <span>Humidity</span>

          <strong>
            {weather.humidity}%
          </strong>
        </div>

        <div
          className="weather-metric"
        >
          <span>Wind</span>

          <strong>
            {Math.round(
              weather
                .windSpeedKmh
            )}{" "}
            km/h
          </strong>
        </div>

        <div
          className="weather-metric"
        >
          <span>
            UV Max Today
          </span>

          <strong>
            {Number(
              weather.uvIndex
            ).toFixed(1)}
          </strong>
        </div>

        <div
          className="weather-metric"
        >
          <span>Sunrise</span>

          <strong>
            {weather.sunrise}
          </strong>
        </div>

        <div
          className="weather-metric"
        >
          <span>Sunset</span>

          <strong>
            {weather.sunset}
          </strong>
        </div>

        <button
          className="
            unit-toggle-button
          "
          type="button"
          onClick={
            onToggleUnit
          }
        >
          Display{" "}
          {unit === "C"
            ? "°F"
            : "°C"}
        </button>
      </div>
    </section>
  );
}

export default WeatherCard;