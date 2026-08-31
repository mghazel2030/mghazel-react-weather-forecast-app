//==================================================
// File name: SearchBar.jsx
//==================================================
// Description:
// Defines the STEP 3 location-selection component.
//
// The component demonstrates React props and parent-child
// communication. It receives the current city and a callback
// function from App.jsx.
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 3.0
//==================================================

/**
 * Renders the current location and provides a temporary
 * control for changing the selected city.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.city - Currently selected city.
 * @param {Function} props.onChangeCity - Callback used to
 * update the selected city in the parent component.
 *
 * @returns {JSX.Element} The location-selection interface.
 */
function SearchBar({ city, onChangeCity }) {
  return (
    <section className="search-section">
      <h2>Location</h2>

      <p>
        Current city:
        {" "}
        <strong>{city}</strong>
      </p>

      <button
        type="button"
        onClick={onChangeCity}
      >
        Change Sample City
      </button>

      <p className="step-note">
        STEP 3 uses predefined sample cities.
        A complete search form will be implemented later.
      </p>
    </section>
  );
}

export default SearchBar;