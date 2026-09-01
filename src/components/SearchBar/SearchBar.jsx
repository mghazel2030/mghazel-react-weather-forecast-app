// ============================================================
// File name: SearchBar.jsx
// ============================================================
// Objective:
// Provide city search, browser geolocation, and clear/reset
// controls.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
// ============================================================

import {
  useState,
} from "react";


/**
 * Final weather search controls.
 *
 * @param {Object} props Properties.
 * @returns {JSX.Element} Search interface.
 */
function SearchBar({
  city,
  onSearch,
  onUseMyLocation,
  onClear,
  isLoading,
}) {
  const [
    cityInput,
    setCityInput,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");


  function handleInputChange(
    event
  ) {
    setCityInput(
      event.target.value
    );

    if (errorMessage) {
      setErrorMessage("");
    }
  }


  function handleSubmit(
    event
  ) {
    event.preventDefault();

    const normalizedInput =
      cityInput.trim();

    if (!normalizedInput) {
      setErrorMessage(
        "Please enter a city or location."
      );

      return;
    }

    setErrorMessage("");

    onSearch(
      normalizedInput
    );

    setCityInput("");
  }


  function handleClear() {
    setCityInput("");

    setErrorMessage("");

    onClear();
  }


  return (
    <section
      className="search-panel"
      aria-label="Weather search"
    >
      <form
        className="search-form"
        onSubmit={
          handleSubmit
        }
        noValidate
      >
        <label
          className="sr-only"
          htmlFor="city-search"
        >
          City or location
        </label>

        <input
          id="city-search"
          name="city"
          type="text"
          value={cityInput}
          onChange={
            handleInputChange
          }
          placeholder={
            `Search another city — current: ${city}`
          }
          autoComplete="off"
          disabled={isLoading}
          aria-describedby={
            errorMessage
              ? "city-search-error"
              : undefined
          }
        />

        <button
          className="
            button
            button-primary
          "
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Searching..."
            : "Search"}
        </button>

        <button
          className="
            button
            button-location
          "
          type="button"
          onClick={
            onUseMyLocation
          }
          disabled={isLoading}
        >
          📍 Use My Location
        </button>

        <button
          className="
            button
            button-secondary
          "
          type="button"
          onClick={
            handleClear
          }
          disabled={isLoading}
        >
          Clear
        </button>
      </form>

      {errorMessage && (
        <p
          id="city-search-error"
          className="
            form-error-message
          "
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </section>
  );
}

export default SearchBar;