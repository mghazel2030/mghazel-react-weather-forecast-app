//==================================================
// File name: SearchBar.jsx
//==================================================
// Description:
// Defines the initial reusable location-search user interface
// for the Weather Forecasting App.
//
// During STEP 2 this component is presentational only. Event
// handling and application state will be implemented in later
// development steps.
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 2.0
//==================================================

/**
 * Renders the weather location search interface.
 *
 * STEP 2 intentionally provides only the JSX structure.
 * Search events and state management will be introduced in
 * subsequent lectures.
 *
 * @returns {JSX.Element} The location search interface.
 */
function SearchBar() {
  return (
    <section className="search-section">
      <h2>Search Weather</h2>

      <form className="search-form">
        <label htmlFor="city-input">City or Location</label>

        <div className="search-controls">
          <input
            id="city-input"
            name="city"
            type="text"
            placeholder="Example: Calgary"
          />

          <button type="button">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchBar;