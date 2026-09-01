// ============================================================
// File name: weatherService.js
// ============================================================
// Objective:
// Provide the application's dedicated Open-Meteo integration
// layer.
//
// High-Level Processing Pipeline:
//
// User location string
//        ↓
// geocodeLocation()
//        ↓
// Open-Meteo Geocoding API
//        ↓
// latitude + longitude
//        ↓
// requestWeather()
//        ↓
// Open-Meteo Forecast API
//        ↓
// raw Open-Meteo JSON
//        ↓
// normalizeWeatherData()
//        ↓
// stable application weather model
//
// Design Objectives:
// - Keep API-specific logic outside React components.
// - Translate provider errors into application-level errors.
// - Normalize Open-Meteo's parallel time-series arrays.
// - Keep components independent of Open-Meteo field names.
//
// Open-Meteo:
// The public non-commercial API used by this project does not
// require an API key.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.0
// ============================================================

import {
  formatIsoDate,
  formatIsoHour,
  formatIsoTime,
  getWeatherDescription,
  getWeatherSymbol,
} from "../utils/weatherUtils";


/**
 * Open-Meteo Geocoding API endpoint.
 */
const GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";


/**
 * Open-Meteo Forecast API endpoint.
 */
const FORECAST_URL =
  "https://api.open-meteo.com/v1/forecast";


/**
 * Application-specific error used to distinguish expected
 * weather-service failures from unexpected JavaScript errors.
 */
export class WeatherServiceError extends Error {
  /**
   * Creates a weather-service error.
   *
   * @param {string} message - User-readable error message.
   * @param {string} code - Programmatic error identifier.
   */
  constructor(
    message,
    code = "WEATHER_SERVICE_ERROR"
  ) {
    super(message);

    this.name = "WeatherServiceError";
    this.code = code;
  }
}


/**
 * Resolves a user-entered location into geographic coordinates.
 *
 * The first matching Open-Meteo geocoding result is currently
 * used. Location disambiguation can be introduced later.
 *
 * Example:
 *
 *     "Vancouver"
 *
 *       ↓
 *
 *     {
 *       name,
 *       state,
 *       country,
 *       latitude,
 *       longitude,
 *       timezone
 *     }
 *
 * @param {string} locationQuery - City/location search string.
 *
 * @returns {Promise<Object>}
 * Normalized geographic location.
 *
 * @throws {WeatherServiceError}
 * When the geocoding request fails or returns no location.
 */
async function geocodeLocation(locationQuery) {
  const parameters =
    new URLSearchParams({
      name: locationQuery,
      count: "1",
      language: "en",
      format: "json",
    });

  const requestUrl =
    `${GEOCODING_URL}?${parameters.toString()}`;

  const response =
    await fetch(requestUrl);

  if (!response.ok) {
    throw new WeatherServiceError(
      "Unable to resolve the requested location.",
      "GEOCODING_REQUEST_ERROR"
    );
  }

  const data =
    await response.json();

  if (
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new WeatherServiceError(
      `No location was found for "${locationQuery}".`,
      "LOCATION_NOT_FOUND"
    );
  }

  const location =
    data.results[0];

  return {
    name:
      location.name ?? locationQuery,

    state:
      location.admin1 ?? "",

    country:
      location.country ?? "",

    countryCode:
      location.country_code ?? "",

    latitude:
      location.latitude,

    longitude:
      location.longitude,

    timezone:
      location.timezone ?? "auto",
  };
}


/**
 * Retrieves live weather information from Open-Meteo using
 * geographic coordinates.
 *
 * Requested current variables:
 * - temperature_2m
 * - relative_humidity_2m
 * - apparent_temperature
 * - weather_code
 * - wind_speed_10m
 *
 * Requested hourly variables:
 * - temperature_2m
 * - weather_code
 *
 * Requested daily variables:
 * - weather_code
 * - temperature_2m_max
 * - temperature_2m_min
 * - sunrise
 * - sunset
 * - uv_index_max
 *
 * All temperatures are requested in Celsius and wind speed in
 * km/h. The application can later convert Celsius into
 * Fahrenheit without issuing another network request.
 *
 * @param {number} latitude - WGS84 latitude.
 * @param {number} longitude - WGS84 longitude.
 *
 * @returns {Promise<Object>} Raw Open-Meteo forecast JSON.
 *
 * @throws {WeatherServiceError}
 * When Open-Meteo responds with an unsuccessful HTTP status.
 */
async function requestWeather(
  latitude,
  longitude
) {
  const parameters =
    new URLSearchParams({
      latitude:
        String(latitude),

      longitude:
        String(longitude),

      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m",
      ].join(","),

      hourly: [
        "temperature_2m",
        "weather_code",
      ].join(","),

      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "uv_index_max",
      ].join(","),

      temperature_unit:
        "celsius",

      wind_speed_unit:
        "kmh",

      timezone:
        "auto",

      forecast_days:
        "7",
    });

  const requestUrl =
    `${FORECAST_URL}?${parameters.toString()}`;

  const response =
    await fetch(requestUrl);

  if (!response.ok) {
    throw new WeatherServiceError(
      "Weather information could not be retrieved.",
      "FORECAST_REQUEST_ERROR"
    );
  }

  return response.json();
}


/**
 * Locates the hourly forecast entry corresponding most closely
 * to Open-Meteo's current local hour.
 *
 * Open-Meteo hourly data begins at midnight. Simply taking
 * hourly.slice(0, 12) would therefore display the first twelve
 * hours of the day instead of the next twelve hours.
 *
 * This function compares:
 *
 *     current.time = YYYY-MM-DDTHH:mm
 *
 * with:
 *
 *     hourly.time[]
 *
 * at YYYY-MM-DDTHH precision.
 *
 * @param {string[]} hourlyTimes - Hourly ISO timestamps.
 * @param {string} currentTime - Current Open-Meteo local time.
 *
 * @returns {number} Starting hourly-array index.
 */
function findCurrentHourlyIndex(
  hourlyTimes,
  currentTime
) {
  if (
    !Array.isArray(hourlyTimes) ||
    hourlyTimes.length === 0 ||
    !currentTime
  ) {
    return 0;
  }

  const currentHourPrefix =
    currentTime.slice(0, 13);

  const matchingIndex =
    hourlyTimes.findIndex(
      (time) =>
        time.slice(0, 13) ===
        currentHourPrefix
    );

  return matchingIndex >= 0
    ? matchingIndex
    : 0;
}


/**
 * Converts Open-Meteo-specific response data into the stable
 * data model consumed by the React application.
 *
 * Open-Meteo often represents time-series information as
 * parallel arrays:
 *
 *     hourly.time[index]
 *     hourly.temperature_2m[index]
 *     hourly.weather_code[index]
 *
 * The application converts those arrays into objects:
 *
 *     {
 *       time,
 *       temperatureCelsius,
 *       condition,
 *       weatherSymbol
 *     }
 *
 * This keeps index-based provider logic out of UI components.
 *
 * @param {Object} location - Normalized geocoding result.
 * @param {Object} apiData - Raw Open-Meteo forecast response.
 *
 * @returns {Object}
 * Stable application weather-data model.
 */
export function normalizeWeatherData(
  location,
  apiData
) {
  const current =
    apiData.current ?? {};

  const hourly =
    apiData.hourly ?? {};

  const daily =
    apiData.daily ?? {};


  // ----------------------------------------------------------
  // LOCATION
  // ----------------------------------------------------------

  const locationParts = [
    location.name,
    location.state,
    location.country,
  ].filter(Boolean);

  const displayName =
    locationParts.join(", ");


  // ----------------------------------------------------------
  // CURRENT WEATHER
  // ----------------------------------------------------------

  const currentWeatherCode =
    current.weather_code ?? -1;

  const todayUvIndex =
    daily.uv_index_max?.[0] ?? 0;

  const todaySunrise =
    daily.sunrise?.[0] ?? "";

  const todaySunset =
    daily.sunset?.[0] ?? "";


  // ----------------------------------------------------------
  // HOURLY WEATHER
  // ----------------------------------------------------------

  const hourlyTimes =
    hourly.time ?? [];

  const hourlyTemperatures =
    hourly.temperature_2m ?? [];

  const hourlyWeatherCodes =
    hourly.weather_code ?? [];

  const hourlyStartIndex =
    findCurrentHourlyIndex(
      hourlyTimes,
      current.time
    );

  const hourlyEndIndex =
    hourlyStartIndex + 12;

  const nextTwelveTimes =
    hourlyTimes.slice(
      hourlyStartIndex,
      hourlyEndIndex
    );

  const normalizedHourly =
    nextTwelveTimes.map(
      (time, relativeIndex) => {
        const sourceIndex =
          hourlyStartIndex +
          relativeIndex;

        const weatherCode =
          hourlyWeatherCodes[
            sourceIndex
          ] ?? -1;

        return {
          id:
            time,

          time:
            formatIsoHour(time),

          temperatureCelsius:
            hourlyTemperatures[
              sourceIndex
            ] ?? 0,

          weatherCode,

          condition:
            getWeatherDescription(
              weatherCode
            ),

          weatherSymbol:
            getWeatherSymbol(
              weatherCode
            ),
        };
      }
    );


  // ----------------------------------------------------------
  // DAILY WEATHER
  // ----------------------------------------------------------

  const dailyTimes =
    daily.time ?? [];

  const dailyHighs =
    daily.temperature_2m_max ?? [];

  const dailyLows =
    daily.temperature_2m_min ?? [];

  const dailyWeatherCodes =
    daily.weather_code ?? [];

  const dailySunrises =
    daily.sunrise ?? [];

  const dailySunsets =
    daily.sunset ?? [];

  const dailyUvIndices =
    daily.uv_index_max ?? [];

  const normalizedDaily =
    dailyTimes
      .slice(0, 7)
      .map(
        (date, index) => {
          const weatherCode =
            dailyWeatherCodes[
              index
            ] ?? -1;

          return {
            id:
              date,

            date,

            day:
              formatIsoDate(
                date
              ),

            highCelsius:
              dailyHighs[
                index
              ] ?? 0,

            lowCelsius:
              dailyLows[
                index
              ] ?? 0,

            weatherCode,

            condition:
              getWeatherDescription(
                weatherCode
              ),

            weatherSymbol:
              getWeatherSymbol(
                weatherCode
              ),

            sunrise:
              formatIsoTime(
                dailySunrises[
                  index
                ]
              ),

            sunset:
              formatIsoTime(
                dailySunsets[
                  index
                ]
              ),

            uvIndex:
              dailyUvIndices[
                index
              ] ?? 0,
          };
        }
      );


  // ----------------------------------------------------------
  // FINAL APPLICATION MODEL
  // ----------------------------------------------------------

  return {
    location: {
      ...location,
      displayName,
    },

    current: {
      temperatureCelsius:
        current.temperature_2m ?? 0,

      feelsLikeCelsius:
        current.apparent_temperature ?? 0,

      humidity:
        current.relative_humidity_2m ?? 0,

      windSpeedKmh:
        current.wind_speed_10m ?? 0,

      weatherCode:
        currentWeatherCode,

      condition:
        getWeatherDescription(
          currentWeatherCode
        ),

      weatherSymbol:
        getWeatherSymbol(
          currentWeatherCode
        ),

      uvIndex:
        todayUvIndex,

      sunrise:
        formatIsoTime(
          todaySunrise
        ),

      sunset:
        formatIsoTime(
          todaySunset
        ),
    },

    hourly:
      normalizedHourly,

    daily:
      normalizedDaily,
  };
}


/**
 * Public service function used by the React application.
 *
 * Orchestrates:
 *
 *     location string
 *          ↓
 *     geocoding
 *          ↓
 *     coordinates
 *          ↓
 *     weather request
 *          ↓
 *     normalization
 *
 * Unexpected network failures are converted into a
 * WeatherServiceError so App.jsx receives a predictable error
 * type and user-friendly message.
 *
 * @param {string} locationQuery - User-entered city/location.
 *
 * @returns {Promise<Object>}
 * Fully normalized application weather data.
 *
 * @throws {WeatherServiceError}
 * For geocoding, forecast, or network failures.
 */
export async function getWeatherByCity(
  locationQuery
) {
  try {
    const location =
      await geocodeLocation(
        locationQuery
      );

    const apiData =
      await requestWeather(
        location.latitude,
        location.longitude
      );

    return normalizeWeatherData(
      location,
      apiData
    );
  } catch (error) {
    if (
      error instanceof
      WeatherServiceError
    ) {
      throw error;
    }

    throw new WeatherServiceError(
      "Unable to connect to the weather service. Please check your connection and try again.",
      "NETWORK_ERROR"
    );
  }
}