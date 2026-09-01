// ============================================================
// File name: weatherService.js
// ============================================================
// Objective:
// Centralize all Open-Meteo API interaction and transform
// provider-specific responses into the application's stable
// weather domain model.
//
// STEP 7 Additions:
// - Weather lookup directly by geographic coordinates.
// - Current precipitation.
// - Hourly humidity.
// - Hourly precipitation probability.
// - Daily precipitation probability.
// - Geolocation-ready weather pipeline.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================

import {
  formatIsoDate,
  formatIsoHour,
  formatIsoTime,
  getWeatherDescription,
  getWeatherSymbol,
  normalizePercentage,
} from "../utils/weatherUtils";


const GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const FORECAST_URL =
  "https://api.open-meteo.com/v1/forecast";


/**
 * Error type representing an expected weather-service failure.
 */
export class WeatherServiceError extends Error {
  /**
   * @param {string} message User-readable description.
   * @param {string} code Application error identifier.
   */
  constructor(
    message,
    code = "WEATHER_SERVICE_ERROR"
  ) {
    super(message);

    this.name =
      "WeatherServiceError";

    this.code =
      code;
  }
}


/**
 * Resolves a location name into geographic coordinates.
 *
 * @param {string} locationQuery City/location.
 * @returns {Promise<Object>} Normalized location.
 */
async function geocodeLocation(locationQuery) {
  const parameters =
    new URLSearchParams({
      name: locationQuery,
      count: "1",
      language: "en",
      format: "json",
    });

  const response =
    await fetch(
      `${GEOCODING_URL}?${parameters.toString()}`
    );

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
 * Requests Open-Meteo weather data for coordinates.
 *
 * @param {number} latitude Latitude.
 * @param {number} longitude Longitude.
 * @returns {Promise<Object>} Raw API response.
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
        "precipitation",
        "weather_code",
        "wind_speed_10m",
      ].join(","),

      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation_probability",
        "weather_code",
      ].join(","),

      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "sunrise",
        "sunset",
        "uv_index_max",
      ].join(","),

      temperature_unit:
        "celsius",

      wind_speed_unit:
        "kmh",

      precipitation_unit:
        "mm",

      timezone:
        "auto",

      forecast_days:
        "7",
    });

  const response =
    await fetch(
      `${FORECAST_URL}?${parameters.toString()}`
    );

  if (!response.ok) {
    throw new WeatherServiceError(
      "Weather information could not be retrieved.",
      "FORECAST_REQUEST_ERROR"
    );
  }

  return response.json();
}


/**
 * Finds the current location-local hour within Open-Meteo's
 * hourly data arrays.
 *
 * @param {string[]} hourlyTimes Hourly timestamps.
 * @param {string} currentTime Current local API timestamp.
 * @returns {number} Start index.
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

  const currentHour =
    currentTime.slice(0, 13);

  const matchingIndex =
    hourlyTimes.findIndex(
      (time) =>
        time.slice(0, 13) ===
        currentHour
    );

  return matchingIndex >= 0
    ? matchingIndex
    : 0;
}


/**
 * Normalizes raw Open-Meteo data into application objects.
 *
 * @param {Object} location Location metadata.
 * @param {Object} apiData Open-Meteo response.
 * @returns {Object} Application weather model.
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


  const locationParts = [
    location.name,
    location.state,
    location.country,
  ].filter(Boolean);

  const displayName =
    locationParts.join(", ");


  const currentWeatherCode =
    current.weather_code ?? -1;


  // =========================================================
  // HOURLY FORECAST
  // =========================================================

  const hourlyTimes =
    hourly.time ?? [];

  const hourlyTemperatures =
    hourly.temperature_2m ?? [];

  const hourlyHumidity =
    hourly.relative_humidity_2m ?? [];

  const hourlyRainProbability =
    hourly.precipitation_probability ?? [];

  const hourlyWeatherCodes =
    hourly.weather_code ?? [];

  const startIndex =
    findCurrentHourlyIndex(
      hourlyTimes,
      current.time
    );

  const nextHourlyTimes =
    hourlyTimes.slice(
      startIndex,
      startIndex + 12
    );

  const normalizedHourly =
    nextHourlyTimes.map(
      (time, relativeIndex) => {
        const sourceIndex =
          startIndex +
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

          humidity:
            normalizePercentage(
              hourlyHumidity[
                sourceIndex
              ]
            ),

          precipitationProbability:
            normalizePercentage(
              hourlyRainProbability[
                sourceIndex
              ]
            ),

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


  // =========================================================
  // DAILY FORECAST
  // =========================================================

  const dailyTimes =
    daily.time ?? [];

  const dailyHighs =
    daily.temperature_2m_max ?? [];

  const dailyLows =
    daily.temperature_2m_min ?? [];

  const dailyWeatherCodes =
    daily.weather_code ?? [];

  const dailyRainProbability =
    daily.precipitation_probability_max ?? [];

  const dailySunrises =
    daily.sunrise ?? [];

  const dailySunsets =
    daily.sunset ?? [];

  const dailyUv =
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

            precipitationProbability:
              normalizePercentage(
                dailyRainProbability[
                  index
                ]
              ),

            condition:
              getWeatherDescription(
                weatherCode
              ),

            weatherCode,

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
              dailyUv[
                index
              ] ?? 0,
          };
        }
      );


  return {
    location: {
      ...location,

      timezone:
        apiData.timezone ??
        location.timezone ??
        "",

      displayName,
    },

    current: {
      temperatureCelsius:
        current.temperature_2m ?? 0,

      feelsLikeCelsius:
        current.apparent_temperature ?? 0,

      humidity:
        normalizePercentage(
          current.relative_humidity_2m
        ),

      windSpeedKmh:
        current.wind_speed_10m ?? 0,

      precipitationMm:
        current.precipitation ?? 0,

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
        dailyUv[0] ?? 0,

      sunrise:
        formatIsoTime(
          dailySunrises[0]
        ),

      sunset:
        formatIsoTime(
          dailySunsets[0]
        ),
    },

    hourly:
      normalizedHourly,

    daily:
      normalizedDaily,
  };
}


/**
 * Retrieves weather by city/location string.
 *
 * @param {string} locationQuery Location search.
 * @returns {Promise<Object>} Normalized weather.
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


/**
 * Retrieves weather directly from geographic coordinates.
 *
 * This is used by browser geolocation and avoids an
 * unnecessary forward-geocoding operation.
 *
 * @param {number} latitude Latitude.
 * @param {number} longitude Longitude.
 * @param {string} label Location label.
 * @returns {Promise<Object>} Normalized weather.
 */
export async function getWeatherByCoordinates(
  latitude,
  longitude,
  label = "Current Location"
) {
  try {
    const apiData =
      await requestWeather(
        latitude,
        longitude
      );

    const location = {
      name:
        label,

      state:
        "",

      country:
        "",

      countryCode:
        "",

      latitude,

      longitude,

      timezone:
        apiData.timezone ?? "",
    };

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
      "Unable to retrieve weather for your current location.",
      "LOCATION_WEATHER_ERROR"
    );
  }
}