//==================================================
// File name: WeatherCard.jsx
//==================================================
// Description:
// Defines the initial reusable weather-information component.
// Static sample weather information is displayed during STEP 2
// so the JSX component structure can be developed before API
// integration is introduced.
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 2.0
//==================================================

/**
 * Renders a placeholder weather-information card.
 *
 * Static information is intentionally used during STEP 2.
 * Future development steps will replace this content with
 * weather data retrieved from the OpenWeatherMap API.
 *
 * @returns {JSX.Element} A weather-information card.
 */
function WeatherCard() {
  return (
    <section className="weather-card">
      <h2>Weather Information</h2>

      <p className="weather-placeholder">
        Search for a location to display weather information.
      </p>

      <div className="weather-details">
        <p>
          <strong>Temperature:</strong> -- °C
        </p>

        <p>
          <strong>Humidity:</strong> -- %
        </p>

        <p>
          <strong>Wind Speed:</strong> -- km/h
        </p>

        <p>
          <strong>Conditions:</strong> --
        </p>
      </div>
    </section>
  );
}

export default WeatherCard;