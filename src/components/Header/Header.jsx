// ============================================================
// File name: Header.jsx
// ============================================================
// Objective:
// Display application title, instructions, and light/dark
// presentation control.
//
// FINAL-TOUCHES:
// Styling is now component-scoped through Header.module.css.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
// ============================================================

import styles from
  "./Header.module.css";


/**
 * Application header.
 *
 * @param {Object} props
 * @param {"light"|"dark"} props.theme
 * Current application theme.
 * @param {Function} props.onToggleTheme
 * Theme-toggle callback.
 *
 * @returns {JSX.Element}
 * Accessible application header.
 */
function Header({
  theme,
  onToggleTheme,
}) {
  const targetTheme =
    theme === "light"
      ? "dark"
      : "light";

  return (
    <header
      className={
        styles.header
      }
    >
      <div
        className={
          styles.inner
        }
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
          className={
            styles.themeButton
          }
          type="button"
          onClick={
            onToggleTheme
          }
          aria-label={
            `Switch to ${targetTheme} mode`
          }
          title={
            `Switch to ${targetTheme} mode`
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