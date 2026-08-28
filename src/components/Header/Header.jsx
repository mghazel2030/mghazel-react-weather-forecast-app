//==================================================
// File name: Header.jsx
//==================================================
// Description:
// Defines the reusable header component for the Weather
// Forecasting App. The component provides the application
// title and a concise description of the application's purpose.
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 2.0
//==================================================

/**
 * Renders the application's main header.
 *
 * The Header component provides introductory information for
 * the Weather Forecasting App. At this stage it is intentionally
 * presentational and does not manage state or receive props.
 *
 * @returns {JSX.Element} The application header.
 */
function Header() {
  return (
    <header className="app-header">
      <h1>Weather Forecasting App</h1>

      <p>
        Search for a location and explore current and forecast
        weather information.
      </p>
    </header>
  );
}

export default Header;