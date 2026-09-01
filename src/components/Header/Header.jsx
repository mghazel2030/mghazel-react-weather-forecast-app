// ============================================================
// File name: Header.jsx
// ============================================================
// Objective:
// Display application identity, instructions, and theme
// control.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================


/**
 * Application header.
 *
 * @param {Object} props Component properties.
 * @param {"light"|"dark"} props.theme Active theme.
 * @param {Function} props.onToggleTheme Theme callback.
 * @returns {JSX.Element} Header.
 */
function Header({
  theme,
  onToggleTheme,
}) {
  return (
    <header className="app-header">
      <div
        className="
          app-header-inner
        "
      >
        <div>
          <h1>
            City Weather Search
          </h1>

          <p>
            Search a city or use
            your current location
            to view current
            conditions, hourly
            forecasts, and the
            seven-day outlook.
          </p>
        </div>

        <button
          className="
            theme-toggle-button
          "
          type="button"
          onClick={
            onToggleTheme
          }
          aria-label={
            `Switch to ${
              theme === "light"
                ? "dark"
                : "light"
            } mode`
          }
        >
          {theme === "light"
            ? "🌙 Dark"
            : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}

export default Header;