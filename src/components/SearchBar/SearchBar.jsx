// ============================================================
// File name: SearchBar.jsx
// ============================================================
// Objective:
// Provide a controlled, accessible city/location search form.
//
// Responsibilities:
// 1. Maintain local input state.
// 2. Validate user input.
// 3. Display form-validation errors.
// 4. Submit valid locations to App.jsx.
// 5. Clear input/error state.
// 6. Disable controls during asynchronous weather requests.
//
// STEP 6 Addition:
// The isLoading prop prevents repeated weather requests while
// an existing request is in progress.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 6.0
// ============================================================

import {
  useState,
} from "react";


/**
 * Search form used to submit city/location names.
 *
 * @param {Object} props
 * @param {string} props.city
 * Currently displayed location.
 * @param {Function} props.onSearch
 * Parent callback invoked for valid search input.
 * @param {boolean} props.isLoading
 * Whether a weather request is currently active.
 *
 * @returns {JSX.Element}
 * Controlled location-search form.
 */
function SearchBar({
  city,
  onSearch,
  isLoading,
}) {
  // ----------------------------------------------------------
  // LOCAL FORM STATE
  // ----------------------------------------------------------

  const [
    cityInput,
    setCityInput,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");


  // ----------------------------------------------------------
  // INPUT HANDLER
  // ----------------------------------------------------------

  /**
   * Synchronizes the text input with React state.
   *
   * Existing validation feedback is cleared when the user
   * begins correcting the input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * Input-change event.
   *
   * @returns {void}
   */
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


  // ----------------------------------------------------------
  // SUBMIT HANDLER
  // ----------------------------------------------------------

  /**
   * Validates and submits a city/location.
   *
   * event.preventDefault() prevents the browser's traditional
   * HTML form navigation/reload so React remains in control.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   * Form submit event.
   *
   * @returns {void}
   */
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


  // ----------------------------------------------------------
  // CLEAR HANDLER
  // ----------------------------------------------------------

  /**
   * Clears the form input and validation feedback.
   *
   * @returns {void}
   */
  function handleClear() {
    setCityInput("");
    setErrorMessage("");
  }


  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

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