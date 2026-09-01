//==================================================
// File name: Header.jsx
//==================================================
// Description:
// Displays the application title and concise user guidance.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 5.0
//==================================================

/**
 * Renders the application header.
 *
 * @returns {JSX.Element} Weather application heading.
 */
function Header() {
  return (
    <header className="app-header">
      <h1>City Weather Search</h1>

      <p>
        Search a city or location to view current conditions
        and forecast information.
      </p>
    </header>
  );
}

export default Header;