// ============================================================
// File name: weatherUtils.js
// ============================================================
// Objective:
// Provide pure reusable utilities for weather formatting,
// WMO interpretation, temperature conversion, and chart data.
//
// Design:
// This module performs no React rendering and no network I/O.
// Pure deterministic functions are intentionally isolated here
// because they are straightforward to unit test.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================


/**
 * Converts Celsius into Fahrenheit.
 *
 * @param {number} celsius Temperature in degrees Celsius.
 * @returns {number} Equivalent Fahrenheit temperature.
 */
export function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}


/**
 * Formats a Celsius source value according to the requested
 * application display unit.
 *
 * @param {number} celsius Source temperature in Celsius.
 * @param {"C"|"F"} unit Display unit.
 * @returns {string} Formatted rounded temperature.
 */
export function formatTemperature(celsius, unit = "C") {
  const temperature =
    unit === "F"
      ? celsiusToFahrenheit(celsius)
      : celsius;

  return `${Math.round(temperature)}°${unit}`;
}


/**
 * Maps Open-Meteo WMO weather interpretation codes to
 * human-readable descriptions.
 *
 * @param {number} code WMO weather code.
 * @returns {string} Weather condition.
 */
export function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Depositing Rime Fog",

    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",

    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",

    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",

    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",

    71: "Slight Snowfall",
    73: "Moderate Snowfall",
    75: "Heavy Snowfall",
    77: "Snow Grains",

    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",

    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",

    95: "Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail",
  };

  return descriptions[code] ?? "Unknown";
}


/**
 * Maps WMO weather codes to intuitive weather symbols.
 *
 * @param {number} code WMO weather code.
 * @returns {string} Weather emoji.
 */
export function getWeatherSymbol(code) {
  if (code === 0) {
    return "☀️";
  }

  if (code === 1) {
    return "🌤️";
  }

  if (code === 2) {
    return "⛅";
  }

  if (code === 3) {
    return "☁️";
  }

  if ([45, 48].includes(code)) {
    return "🌫️";
  }

  if (
    [
      51, 53, 55,
      56, 57,
      61, 63, 65,
      66, 67,
      80, 81, 82,
    ].includes(code)
  ) {
    return "🌧️";
  }

  if (
    [
      71, 73, 75,
      77,
      85, 86,
    ].includes(code)
  ) {
    return "❄️";
  }

  if ([95, 96, 99].includes(code)) {
    return "⛈️";
  }

  return "🌤️";
}


/**
 * Formats an Open-Meteo local ISO timestamp as a 12-hour time.
 *
 * Open-Meteo is queried with timezone=auto. Therefore the
 * timestamp already represents the requested location's local
 * time and should not be transformed through the user's own
 * browser timezone.
 *
 * @param {string} isoDateTime Local ISO date-time.
 * @returns {string} Example: "7:35 PM".
 */
export function formatIsoTime(isoDateTime) {
  if (!isoDateTime?.includes("T")) {
    return "N/A";
  }

  const [, timePart] = isoDateTime.split("T");

  const [hourText, minuteText] =
    timePart.split(":");

  const hours = Number(hourText);
  const minutes = Number(minuteText);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return "N/A";
  }

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  const displayHour =
    hours % 12 === 0
      ? 12
      : hours % 12;

  return `${displayHour}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
}


/**
 * Formats only the hour component of an Open-Meteo timestamp.
 *
 * @param {string} isoDateTime Local ISO timestamp.
 * @returns {string} Example: "7 PM".
 */
export function formatIsoHour(isoDateTime) {
  if (!isoDateTime?.includes("T")) {
    return "N/A";
  }

  const [, timePart] =
    isoDateTime.split("T");

  const [hourText] =
    timePart.split(":");

  const hours =
    Number(hourText);

  if (Number.isNaN(hours)) {
    return "N/A";
  }

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  const displayHour =
    hours % 12 === 0
      ? 12
      : hours % 12;

  return `${displayHour} ${period}`;
}


/**
 * Formats YYYY-MM-DD without browser-timezone date shifting.
 *
 * @param {string} isoDate ISO calendar date.
 * @returns {string} Example: "Tue, Sep 1".
 */
export function formatIsoDate(isoDate) {
  if (!isoDate) {
    return "N/A";
  }

  const [year, month, day] =
    isoDate
      .split("-")
      .map(Number);

  if (!year || !month || !day) {
    return "N/A";
  }

  const date =
    new Date(
      Date.UTC(
        year,
        month - 1,
        day
      )
    );

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }
  ).format(date);
}


/**
 * Converts a numeric value into a safe rounded percentage.
 *
 * @param {number|null|undefined} value Source percentage.
 * @returns {number} Clamped percentage in [0, 100].
 */
export function normalizePercentage(value) {
  const numericValue =
    Number(value ?? 0);

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(numericValue)
    )
  );
}