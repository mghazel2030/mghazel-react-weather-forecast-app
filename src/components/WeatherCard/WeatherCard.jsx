// ============================================================
// File name: WeatherCard.jsx
// ============================================================
// Objective:
// Present current live weather information.
//
// FINAL-TOUCHES:
// Current-weather styling is now scoped through a CSS Module.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
// ============================================================

import {
  formatTemperature,
} from "../../utils/weatherUtils";

import styles from
  "./WeatherCard.module.css";


function WeatherCard({
  city,
  weather,
  unit,
  onToggleUnit,
}) {
  return (
    <section
      className={
        styles.card
      }
      aria-labelledby="
        current-weather-heading
      "
    >
      <div
        className={
          styles.primary
        }
      >
        <div
          className={
            styles.symbol
          }
          aria-hidden="true"
        >
          {weather.weatherSymbol}
        </div>

        <div>
          <p
            className={
              styles.label
            }
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
            className={
              styles.condition
            }
          >
            {weather.condition}
          </p>

          <p
            className={
              styles.temperature
            }
          >
            {formatTemperature(
              weather
                .temperatureCelsius,
              unit
            )}
          </p>

          <p
            className={
              styles.feelsLike
            }
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
        className={
          styles.details
        }
      >
        <div
          className={
            styles.metric
          }
        >
          <span>
            Humidity
          </span>

          <strong>
            {weather.humidity}%
          </strong>
        </div>

        <div
          className={
            styles.metric
          }
        >
          <span>
            Wind
          </span>

          <strong>
            {Math.round(
              weather
                .windSpeedKmh
            )}{" "}
            km/h
          </strong>
        </div>

        <div
          className={
            styles.metric
          }
        >
          <span>
            Precipitation
          </span>

          <strong>
            {Number(
              weather
                .precipitationMm
            ).toFixed(1)}{" "}
            mm
          </strong>
        </div>

        <div
          className={
            styles.metric
          }
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
          className={
            styles.metric
          }
        >
          <span>
            Sunrise
          </span>

          <strong>
            {weather.sunrise}
          </strong>
        </div>

        <div
          className={
            styles.metric
          }
        >
          <span>
            Sunset
          </span>

          <strong>
            {weather.sunset}
          </strong>
        </div>

        <button
          className={
            styles.unitButton
          }
          type="button"
          onClick={
            onToggleUnit
          }
          aria-label={
            unit === "C"
              ? "Display temperatures in Fahrenheit"
              : "Display temperatures in Celsius"
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