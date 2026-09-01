/**
 * @vitest-environment jsdom
 */

// ============================================================
// File name: geolocationService.test.js
// ============================================================
// Objective:
// Verify successful and failed browser geolocation behavior.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 1.0
// ============================================================

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import {
  getCurrentCoordinates,
} from "./geolocationService";


describe(
  "getCurrentCoordinates",
  () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });


    test(
      "returns browser coordinates",
      async () => {
        const getCurrentPosition =
          vi.fn(
            (success) => {
              success({
                coords: {
                  latitude:
                    49.2827,

                  longitude:
                    -123.1207,
                },
              });
            }
          );

        Object.defineProperty(
          navigator,
          "geolocation",
          {
            configurable:
              true,

            value: {
              getCurrentPosition,
            },
          }
        );

        await expect(
          getCurrentCoordinates()
        ).resolves.toEqual({
          latitude:
            49.2827,

          longitude:
            -123.1207,
        });
      }
    );


    test(
      "reports denied permission",
      async () => {
        Object.defineProperty(
          navigator,
          "geolocation",
          {
            configurable:
              true,

            value: {
              getCurrentPosition:
                vi.fn(
                  (
                    success,
                    error
                  ) => {
                    error({
                      code: 1,
                    });
                  }
                ),
            },
          }
        );

        await expect(
          getCurrentCoordinates()
        ).rejects.toThrow(
          /permission was denied/i
        );
      }
    );


    test(
      "reports a location timeout",
      async () => {
        Object.defineProperty(
          navigator,
          "geolocation",
          {
            configurable:
              true,

            value: {
              getCurrentPosition:
                vi.fn(
                  (
                    success,
                    error
                  ) => {
                    error({
                      code: 3,
                    });
                  }
                ),
            },
          }
        );

        await expect(
          getCurrentCoordinates()
        ).rejects.toThrow(
          /timed out/i
        );
      }
    );
  }
);