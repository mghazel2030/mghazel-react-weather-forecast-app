// ============================================================
// File name: SearchBar.jsx
// ============================================================
// Objective:
// Provide city search, browser geolocation, and clear/reset
// controls.
//
// FINAL-TOUCHES:
// - Component-scoped CSS Module.
// - Improved button accessibility.
// - Refined responsive behavior.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
// ============================================================

import {
  useState,
} from "react";

import styles from
  "./SearchBar.module.css";


/**
 * Weather search control panel.
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
      className={
        styles.panel
      }
      aria-label="Weather search controls"
    >
      <form
        className={
          styles.form
        }
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
          type="search"
          value={cityInput}
          onChange={
            handleInputChange
          }
          placeholder={
            `Search another city — current: ${city}`
          }
          autoComplete="off"
          disabled={isLoading}
          aria-invalid={
            Boolean(
              errorMessage
            )
          }
          aria-describedby={
            errorMessage
              ? "city-search-error"
              : undefined
          }
        />

        <button
          className={
            `${styles.button} ${styles.primary}`
          }
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Searching..."
            : "Search"}
        </button>

        <button
          className={
            `${styles.button} ${styles.location}`
          }
          type="button"
          onClick={
            onUseMyLocation
          }
          disabled={isLoading}
        >
          <span
            aria-hidden="true"
          >
            📍
          </span>{" "}
          Use My Location
        </button>

        <button
          className={
            `${styles.button} ${styles.secondary}`
          }
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
          className={
            styles.error
          }
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </section>
  );
}

export default SearchBar;