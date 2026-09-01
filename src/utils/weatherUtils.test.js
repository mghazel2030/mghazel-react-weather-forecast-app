// ============================================================
// File name: weatherUtils.test.js
// ============================================================
// Objective:
// Unit-test deterministic weather utility functions.
//
// Test Scope:
// - Celsius/Fahrenheit conversion
// - Temperature formatting
// - WMO weather descriptions
// - Weather-symbol mapping
// - Open-Meteo time formatting
//
// No network calls are made.
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
  celsiusToFahrenheit,
  formatIsoHour,
  formatIsoTime,
  formatTemperature,
  getWeatherDescription,
  getWeatherSymbol,
} from "./weatherUtils";


describe(
  "weatherUtils",
  () => {
    test(
      "converts Celsius to Fahrenheit",
      () => {
        expect(
          celsiusToFahrenheit(0)
        ).toBe(32);

        expect(
          celsiusToFahrenheit(20)
        ).toBe(68);
      }
    );


    test(
      "formats Celsius temperatures",
      () => {
        expect(
          formatTemperature(
            18.4,
            "C"
          )
        ).toBe("18°C");
      }
    );


    test(
      "formats Fahrenheit temperatures",
      () => {
        expect(
          formatTemperature(
            20,
            "F"
          )
        ).toBe("68°F");
      }
    );


    test(
      "maps WMO clear-sky code",
      () => {
        expect(
          getWeatherDescription(0)
        ).toBe(
          "Clear Sky"
        );
      }
    );


    test(
      "maps WMO partly-cloudy code",
      () => {
        expect(
          getWeatherDescription(2)
        ).toBe(
          "Partly Cloudy"
        );
      }
    );


    test(
      "maps WMO rain code",
      () => {
        expect(
          getWeatherDescription(61)
        ).toBe(
          "Slight Rain"
        );
      }
    );


    test(
      "returns Unknown for unsupported weather codes",
      () => {
        expect(
          getWeatherDescription(
            999
          )
        ).toBe("Unknown");
      }
    );


    test(
      "returns a weather symbol",
      () => {
        expect(
          getWeatherSymbol(0)
        ).toBe("☀️");

        expect(
          getWeatherSymbol(95)
        ).toBe("⛈️");
      }
    );


    test(
      "formats an Open-Meteo ISO time",
      () => {
        expect(
          formatIsoTime(
            "2026-08-31T18:30"
          )
        ).toBe(
          "6:30 PM"
        );
      }
    );


    test(
      "formats an Open-Meteo hourly label",
      () => {
        expect(
          formatIsoHour(
            "2026-08-31T18:00"
          )
        ).toBe(
          "6 PM"
        );
      }
    );
  }
);