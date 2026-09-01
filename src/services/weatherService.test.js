// ============================================================
// File name: weatherService.test.js
// ============================================================
// Objective:
// Verify transformation of Open-Meteo provider data into the
// application's normalized weather-data model.
//
// Important:
// This test deliberately performs NO live network calls.
//
// Testing Boundary:
//
// Open-Meteo-shaped fixture
//          ↓
// normalizeWeatherData()
//          ↓
// application data model
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.0
// ============================================================

import {
  describe,
  expect,
  test,
} from "vitest";

import {
  normalizeWeatherData,
} from "./weatherService";


describe(
  "normalizeWeatherData",
  () => {
    test(
      "normalizes current, hourly, and daily Open-Meteo weather data",
      () => {
        // -----------------------------------------------------
        // MOCK LOCATION
        // -----------------------------------------------------

        const location = {
          name:
            "Vancouver",

          state:
            "British Columbia",

          country:
            "Canada",

          countryCode:
            "CA",

          latitude:
            49.2827,

          longitude:
            -123.1207,

          timezone:
            "America/Vancouver",
        };


        // -----------------------------------------------------
        // OPEN-METEO-SHAPED FIXTURE
        // -----------------------------------------------------

        const apiData = {
          current: {
            time:
              "2026-08-31T18:30",

            temperature_2m:
              18,

            relative_humidity_2m:
              79,

            apparent_temperature:
              17,

            weather_code:
              2,

            wind_speed_10m:
              14,
          },

          hourly: {
            time: [
              "2026-08-31T17:00",
              "2026-08-31T18:00",
              "2026-08-31T19:00",
              "2026-08-31T20:00",
            ],

            temperature_2m: [
              18,
              19,
              18,
              17,
            ],

            weather_code: [
              1,
              2,
              2,
              3,
            ],
          },

          daily: {
            time: [
              "2026-08-31",
              "2026-09-01",
            ],

            weather_code: [
              61,
              2,
            ],

            temperature_2m_max: [
              21,
              22,
            ],

            temperature_2m_min: [
              13,
              14,
            ],

            sunrise: [
              "2026-08-31T06:25",
              "2026-09-01T06:27",
            ],

            sunset: [
              "2026-08-31T19:52",
              "2026-09-01T19:50",
            ],

            uv_index_max: [
              4.5,
              5.1,
            ],
          },
        };


        // -----------------------------------------------------
        // NORMALIZATION
        // -----------------------------------------------------

        const result =
          normalizeWeatherData(
            location,
            apiData
          );


        // -----------------------------------------------------
        // LOCATION ASSERTIONS
        // -----------------------------------------------------

        expect(
          result
            .location
            .displayName
        ).toBe(
          "Vancouver, British Columbia, Canada"
        );


        // -----------------------------------------------------
        // CURRENT WEATHER ASSERTIONS
        // -----------------------------------------------------

        expect(
          result
            .current
            .temperatureCelsius
        ).toBe(18);

        expect(
          result
            .current
            .feelsLikeCelsius
        ).toBe(17);

        expect(
          result
            .current
            .humidity
        ).toBe(79);

        expect(
          result
            .current
            .windSpeedKmh
        ).toBe(14);

        expect(
          result
            .current
            .condition
        ).toBe(
          "Partly Cloudy"
        );

        expect(
          result
            .current
            .uvIndex
        ).toBe(4.5);

        expect(
          result
            .current
            .sunrise
        ).toBe(
          "6:25 AM"
        );

        expect(
          result
            .current
            .sunset
        ).toBe(
          "7:52 PM"
        );


        // -----------------------------------------------------
        // HOURLY ASSERTIONS
        //
        // Current time is 18:30.
        // Therefore hourly presentation should begin from the
        // 18:00 forecast record, not 17:00.
        // -----------------------------------------------------

        expect(
          result.hourly
        ).toHaveLength(3);

        expect(
          result
            .hourly[0]
            .time
        ).toBe("6 PM");

        expect(
          result
            .hourly[0]
            .temperatureCelsius
        ).toBe(19);

        expect(
          result
            .hourly[0]
            .condition
        ).toBe(
          "Partly Cloudy"
        );


        // -----------------------------------------------------
        // DAILY ASSERTIONS
        // -----------------------------------------------------

        expect(
          result.daily
        ).toHaveLength(2);

        expect(
          result
            .daily[0]
            .highCelsius
        ).toBe(21);

        expect(
          result
            .daily[0]
            .lowCelsius
        ).toBe(13);

        expect(
          result
            .daily[0]
            .condition
        ).toBe(
          "Slight Rain"
        );

        expect(
          result
            .daily[0]
            .uvIndex
        ).toBe(4.5);
      }
    );
  }
);