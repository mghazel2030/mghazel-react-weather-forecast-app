//==================================================
// File name: SearchBar.jsx
//==================================================
// Description:
// Controlled React form used to submit weather locations.
//
// STEP 5 retains the STEP 4 controlled-form architecture
// while upgrading the presentation toward the final weather
// dashboard design.
//
// Processing Workflow:
// 1. User enters a location.
// 2. onChange synchronizes React form state.
// 3. User submits using Search or Enter.
// 4. Default browser submission is prevented.
// 5. Input is normalized and validated.
// 6. Valid location is passed to App through onSearch.
// 7. Invalid input displays validation feedback.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 5.0
//==================================================

import { useState } from "react";

/**
 * Renders the controlled weather-location search form.
 *
 * @param {Object} props Component properties.
 * @param {string} props.city Current selected city.
 * @param {Function} props.onSearch Valid-location callback.
 *
 * @returns {JSX.Element} Search interface.
 */
function SearchBar({ city, onSearch }) {
  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Updates local controlled-input state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * Input change event.
   *
   * @returns {void}
   */
  function handleInputChange(event) {
    setCityInput(event.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  /**
   * Validates and submits the weather location.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   * Form submission event.
   *
   * @returns {void}
   */
  function handleSubmit(event) {
    event.preventDefault();

    const normalizedCity = cityInput.trim();

    if (!normalizedCity) {
      setErrorMessage(
        "Please enter a city or location."
      );
      return;
    }

    onSearch(normalizedCity);

    setCityInput("");
    setErrorMessage("");
  }

  /**
   * Clears the search field and validation feedback.
   *
   * @returns {void}
   */
  function handleClear() {
    setCityInput("");
    setErrorMessage("");
  }

  return (
    <section className="search-panel">
      <form
        className="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-input-wrapper">
          <label
            className="sr-only"
            htmlFor="city-search"
          >
            City or Location
          </label>

          <input
            id="city-search"
            name="city"
            type="text"
            value={cityInput}
            onChange={handleInputChange}
            placeholder={`Search another city — current: ${city}`}
            autoComplete="off"
            aria-describedby={
              errorMessage
                ? "city-search-error"
                : undefined
            }
          />

          {errorMessage && (
            <p
              id="city-search-error"
              className="form-error"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </div>

        <button
          className="button button-primary"
          type="submit"
        >
          Search
        </button>

        <button
          className="button button-secondary"
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
    </section>
  );
}

export default SearchBar;