// ============================================================
// File name: weatherService.test.js
// ============================================================
// Objective:
// Verify that Open-Meteo provider data is correctly normalized
// into the application's stable weather-data model.
//
// STEP 7 Additions:
// - Current precipitation.
// - Hourly relative humidity.
// - Hourly precipitation probability.
// - Daily maximum precipitation probability.
//
// Important Testing Principle:
// This test uses an Open-Meteo-shaped fixture and performs NO
// live network requests. This keeps the test deterministic,
// fast, and independent of Internet/API availability.
//
// Processing Boundary Under Test:
//
// Open-Meteo-shaped fixture
//          ↓
// normalizeWeatherData()
//          ↓
// Application weather model
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
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
        // =====================================================
        // 1. MOCK LOCATION
        // =====================================================
        //
        // This object simulates the normalized location returned
        // by the Open-Meteo Geocoding API.
        //
        // It is passed directly into normalizeWeatherData().
        // =====================================================

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


        // =====================================================
        // 2. OPEN-METEO-SHAPED WEATHER FIXTURE
        // =====================================================
        //
        // This fixture imitates the structure returned by the
        // Open-Meteo Forecast API.
        //
        // STEP 7 introduces several additional fields:
        //
        // current:
        //   precipitation
        //
        // hourly:
        //   relative_humidity_2m
        //   precipitation_probability
        //
        // daily:
        //   precipitation_probability_max
        //
        // These values correspond by ARRAY INDEX.
        // =====================================================

        const apiData = {
          // ---------------------------------------------------
          // General API metadata
          // ---------------------------------------------------

          timezone:
            "America/Vancouver",


          // ---------------------------------------------------
          // CURRENT WEATHER
          // ---------------------------------------------------

          current: {
            time:
              "2026-08-31T18:30",

            temperature_2m:
              18,

            relative_humidity_2m:
              79,

            apparent_temperature:
              17,

            // NEW STEP 7 VALUE:
            // Current precipitation in millimetres.
            precipitation:
              0.2,

            weather_code:
              2,

            wind_speed_10m:
              14,
          },


          // ---------------------------------------------------
          // HOURLY FORECAST
          // ---------------------------------------------------
          //
          // Open-Meteo returns parallel arrays.
          //
          // Example:
          //
          // index 1:
          // time[1]                     = 18:00
          // temperature_2m[1]           = 19
          // relative_humidity_2m[1]     = 72
          // precipitation_probability[1]= 20
          // weather_code[1]             = 2
          //
          // normalizeWeatherData() combines these into one
          // application-level hourly object.
          // ---------------------------------------------------

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

            // NEW STEP 7 ARRAY:
            relative_humidity_2m: [
              70,
              72,
              74,
              75,
            ],

            // NEW STEP 7 ARRAY:
            precipitation_probability: [
              10,
              20,
              30,
              40,
            ],

            weather_code: [
              1,
              2,
              2,
              3,
            ],
          },


          // ---------------------------------------------------
          // DAILY FORECAST
          // ---------------------------------------------------

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

            // NEW STEP 7 ARRAY:
            precipitation_probability_max: [
              45,
              20,
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


        // =====================================================
        // 3. NORMALIZE THE PROVIDER DATA
        // =====================================================

        const result =
          normalizeWeatherData(
            location,
            apiData
          );


        // =====================================================
        // 4. LOCATION ASSERTIONS
        // =====================================================

        expect(
          result
            .location
            .displayName
        ).toBe(
          "Vancouver, British Columbia, Canada"
        );

        expect(
          result
            .location
            .timezone
        ).toBe(
          "America/Vancouver"
        );


        // =====================================================
        // 5. CURRENT WEATHER ASSERTIONS
        // =====================================================

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
        // NEW STEP 7 ASSERTION:
        // Current precipitation.
        // -----------------------------------------------------

        expect(
          result
            .current
            .precipitationMm
        ).toBe(0.2);


        // =====================================================
        // 6. HOURLY FORECAST ASSERTIONS
        // =====================================================
        //
        // Current time:
        //
        //     2026-08-31T18:30
        //
        // The normalization logic matches the current HOUR:
        //
        //     18
        //
        // so the first normalized hourly item corresponds to:
        //
        //     2026-08-31T18:00
        //
        // Therefore it uses SOURCE ARRAY INDEX 1.
        // =====================================================

        expect(
          result.hourly
        ).toHaveLength(3);

        expect(
          result
            .hourly[0]
            .time
        ).toBe(
          "6 PM"
        );

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
        // NEW STEP 7 ASSERTION:
        // Hourly relative humidity.
        //
        // Source:
        //
        // relative_humidity_2m[1] = 72
        // -----------------------------------------------------

        expect(
          result
            .hourly[0]
            .humidity
        ).toBe(72);


        // -----------------------------------------------------
        // NEW STEP 7 ASSERTION:
        // Hourly precipitation probability.
        //
        // Source:
        //
        // precipitation_probability[1] = 20
        // -----------------------------------------------------

        expect(
          result
            .hourly[0]
            .precipitationProbability
        ).toBe(20);


        // =====================================================
        // 7. DAILY FORECAST ASSERTIONS
        // =====================================================

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


        // -----------------------------------------------------
        // NEW STEP 7 ASSERTION:
        // Daily maximum precipitation probability.
        //
        // Source:
        //
        // precipitation_probability_max[0] = 45
        // -----------------------------------------------------

        expect(
          result
            .daily[0]
            .precipitationProbability
        ).toBe(45);
      }
    );
  }
);