// ============================================================
// File name: weatherUtils.js
// ============================================================
// Objective:
// Provide pure, reusable utility functions for weather-data
// formatting and presentation.
//
// STEP 6 Responsibilities:
// 1. Convert Celsius to Fahrenheit.
// 2. Format temperatures for display.
// 3. Translate Open-Meteo WMO weather codes into readable
//    weather descriptions.
// 4. Map weather codes to simple weather symbols.
// 5. Format Open-Meteo local ISO time strings.
// 6. Format Open-Meteo date strings.
//
// Design Principle:
// These functions do not:
// - access React state,
// - access the DOM,
// - perform network requests,
// - mutate external data.
//
// Their deterministic behavior makes them easy to unit test.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.0
// ============================================================


/**
 * Converts a Celsius temperature into Fahrenheit.
 *
 * Formula:
 *
 *     F = (C × 9 / 5) + 32
 *
 * @param {number} celsius - Temperature in degrees Celsius.
 * @returns {number} Equivalent Fahrenheit temperature.
 */
export function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}


/**
 * Formats a Celsius temperature according to the application's
 * selected temperature unit.
 *
 * Open-Meteo is requested in metric/Celsius units. Conversion
 * into Fahrenheit is deliberately performed in the UI/domain
 * layer so one API response supports both display modes.
 *
 * @param {number} celsius - Temperature in Celsius.
 * @param {"C"|"F"} unit - Requested display unit.
 * @returns {string} Rounded temperature including unit label.
 */
export function formatTemperature(celsius, unit = "C") {
  const numericTemperature =
    unit === "F"
      ? celsiusToFahrenheit(celsius)
      : celsius;

  return `${Math.round(numericTemperature)}°${unit}`;
}


/**
 * Converts an Open-Meteo WMO weather interpretation code into
 * a human-readable description.
 *
 * @param {number} code - WMO weather code returned by Open-Meteo.
 * @returns {string} Human-readable weather condition.
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
 * Maps an Open-Meteo WMO weather code to a compact visual
 * weather symbol.
 *
 * The application deliberately owns this presentation mapping
 * rather than depending on an external weather-icon service.
 *
 * @param {number} code - WMO weather interpretation code.
 * @returns {string} Weather emoji/symbol.
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
      51,
      53,
      55,
      56,
      57,
      61,
      63,
      65,
      66,
      67,
      80,
      81,
      82,
    ].includes(code)
  ) {
    return "🌧️";
  }

  if (
    [
      71,
      73,
      75,
      77,
      85,
      86,
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
 * Formats an Open-Meteo local ISO-8601 date/time string into
 * a readable 12-hour clock.
 *
 * Example:
 *
 *     "2026-08-31T18:00"
 *
 * becomes:
 *
 *     "6:00 PM"
 *
 * Important:
 * Open-Meteo is requested with timezone=auto, so returned
 * timestamps already represent the searched location's local
 * clock time. This function therefore avoids converting the
 * timestamp through the browser's own timezone.
 *
 * @param {string} isoDateTime - Open-Meteo local ISO time.
 * @returns {string} Human-readable local time.
 */
export function formatIsoTime(isoDateTime) {
  if (!isoDateTime || !isoDateTime.includes("T")) {
    return "N/A";
  }

  const [, timePart] = isoDateTime.split("T");

  const [hoursText, minutesText] =
    timePart.split(":");

  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return "N/A";
  }

  const period = hours >= 12 ? "PM" : "AM";

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
 * Formats only the hour portion of an Open-Meteo local
 * ISO-8601 date/time.
 *
 * Example:
 *
 *     "2026-08-31T18:00"
 *
 * becomes:
 *
 *     "6 PM"
 *
 * @param {string} isoDateTime - Open-Meteo local ISO time.
 * @returns {string} Compact local-hour label.
 */
export function formatIsoHour(isoDateTime) {
  if (!isoDateTime || !isoDateTime.includes("T")) {
    return "N/A";
  }

  const [, timePart] = isoDateTime.split("T");

  const [hoursText] = timePart.split(":");

  const hours = Number(hoursText);

  if (Number.isNaN(hours)) {
    return "N/A";
  }

  const period = hours >= 12 ? "PM" : "AM";

  const displayHour =
    hours % 12 === 0
      ? 12
      : hours % 12;

  return `${displayHour} ${period}`;
}


/**
 * Formats an Open-Meteo YYYY-MM-DD date into a short readable
 * forecast label.
 *
 * Example:
 *
 *     "2026-08-31"
 *
 * becomes something similar to:
 *
 *     "Mon, Aug 31"
 *
 * UTC is used deliberately so the browser does not shift the
 * calendar date when interpreting the date-only string.
 *
 * @param {string} isoDate - Date formatted as YYYY-MM-DD.
 * @returns {string} Formatted date label.
 */
export function formatIsoDate(isoDate) {
  if (!isoDate) {
    return "N/A";
  }

  const [year, month, day] =
    isoDate.split("-").map(Number);

  if (!year || !month || !day) {
    return "N/A";
  }

  const date = new Date(
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