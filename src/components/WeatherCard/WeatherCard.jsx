// ============================================================
// File name: WeatherCard.jsx
// ============================================================
// Objective:
// Present the current live weather conditions.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";


/**
 * Current weather card.
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

        <div>
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
            className="feels-like"
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
        <div className="weather-metric">
          <span>Humidity</span>
          <strong>
            {weather.humidity}%
          </strong>
        </div>

        <div className="weather-metric">
          <span>Wind</span>
          <strong>
            {Math.round(
              weather.windSpeedKmh
            )}{" "}
            km/h
          </strong>
        </div>

        <div className="weather-metric">
          <span>Precipitation</span>
          <strong>
            {Number(
              weather.precipitationMm
            ).toFixed(1)}{" "}
            mm
          </strong>
        </div>

        <div className="weather-metric">
          <span>UV Max Today</span>
          <strong>
            {Number(
              weather.uvIndex
            ).toFixed(1)}
          </strong>
        </div>

        <div className="weather-metric">
          <span>Sunrise</span>
          <strong>
            {weather.sunrise}
          </strong>
        </div>

        <div className="weather-metric">
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