// ============================================================
// File name: geolocationService.js
// ============================================================
// Objective:
// Isolate browser geolocation access from React components.
//
// Benefits:
// - App.jsx does not directly manage navigator.geolocation.
// - Browser-specific errors are translated into readable errors.
// - Geolocation behavior can be unit tested independently.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 1.0
// ============================================================


/**
 * Error representing a browser-geolocation failure.
 */
export class GeolocationError extends Error {
  /**
   * @param {string} message User-readable message.
   * @param {string} code Application error code.
   */
  constructor(
    message,
    code = "GEOLOCATION_ERROR"
  ) {
    super(message);

    this.name =
      "GeolocationError";

    this.code =
      code;
  }
}


/**
 * Retrieves current browser geographic coordinates.
 *
 * @returns {Promise<{latitude:number, longitude:number}>}
 * Current coordinates.
 */
export function getCurrentCoordinates() {
  return new Promise(
    (resolve, reject) => {
      if (
        typeof navigator ===
          "undefined" ||
        !navigator.geolocation
      ) {
        reject(
          new GeolocationError(
            "Geolocation is not supported by this browser.",
            "GEOLOCATION_UNSUPPORTED"
          )
        );

        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude,
          });
        },

        (error) => {
          if (error.code === 1) {
            reject(
              new GeolocationError(
                "Location permission was denied. Please allow location access or search by city.",
                "GEOLOCATION_PERMISSION_DENIED"
              )
            );

            return;
          }

          if (error.code === 2) {
            reject(
              new GeolocationError(
                "Your current location could not be determined.",
                "GEOLOCATION_UNAVAILABLE"
              )
            );

            return;
          }

          if (error.code === 3) {
            reject(
              new GeolocationError(
                "The location request timed out. Please try again.",
                "GEOLOCATION_TIMEOUT"
              )
            );

            return;
          }

          reject(
            new GeolocationError(
              "Unable to access your current location."
            )
          );
        },

        {
          enableHighAccuracy:
            false,

          timeout:
            10000,

          maximumAge:
            300000,
        }
      );
    }
  );
}