// ============================================================
// File name: App.jsx
// ============================================================
// Objective:
// Root application component for the React Weather
// Forecasting App.
//
// STEP 6 Major Upgrade:
// Replace STEP 5 sample weather data with live Open-Meteo
// weather information.
//
// Main Responsibilities:
// 1. Maintain shared application state.
// 2. Load default Vancouver weather on application startup.
// 3. Process valid SearchBar city/location requests.
// 4. Call the Open-Meteo service abstraction.
// 5. Track asynchronous loading state.
// 6. Track API/network error state.
// 7. Store normalized live weather data.
// 8. Maintain the shared Celsius/Fahrenheit display unit.
// 9. Coordinate presentation components.
//
// Data Flow:
//
// SearchBar
//    ↓
// App
//    ↓
// weatherService
//    ↓
// Open-Meteo
//    ↓
// normalized weatherData
//    ↓
// WeatherCard / HourlyForecast / DailyForecast
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 6.0
// ============================================================

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Header from
  "./components/Header/Header";

import SearchBar from
  "./components/SearchBar/SearchBar";

import WeatherCard from
  "./components/WeatherCard/WeatherCard";

import HourlyForecast from
  "./components/HourlyForecast/HourlyForecast";

import DailyForecast from
  "./components/DailyForecast/DailyForecast";

import Footer from
  "./components/Footer/Footer";

import {
  getWeatherByCity,
} from "./services/weatherService";

import "./App.css";


/**
 * Root React application component.
 *
 * @returns {JSX.Element}
 * Complete weather application.
 */
function App() {
  // ----------------------------------------------------------
  // APPLICATION STATE
  // ----------------------------------------------------------

  /**
   * Label for the most recently successfully loaded location.
   */
  const [
    city,
    setCity,
  ] = useState("Vancouver");


  /**
   * Shared temperature-display unit.
   *
   * "C" = Celsius
   * "F" = Fahrenheit
   */
  const [
    unit,
    setUnit,
  ] = useState("C");


  /**
   * Normalized live weather information.
   *
   * null means no successful response has been loaded yet.
   */
  const [
    weatherData,
    setWeatherData,
  ] = useState(null);


  /**
   * Indicates whether an asynchronous weather request is
   * currently active.
   */
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  /**
   * User-readable API/network error.
   *
   * Empty string means no active weather-service error.
   */
  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");


  // ----------------------------------------------------------
  // WEATHER LOADING PIPELINE
  // ----------------------------------------------------------

  /**
   * Loads weather information for a location.
   *
   * Request lifecycle:
   *
   *     start
   *       ↓
   *     loading = true
   *       ↓
   *     clear old error
   *       ↓
   *     call weather service
   *       ↓
   *   success / failure
   *       ↓
   *     loading = false
   *
   * The function is memoized with useCallback so it can safely
   * participate in the initial useEffect dependency array.
   *
   * @param {string} locationQuery
   * City/location to search.
   *
   * @returns {Promise<void>}
   */
  const loadWeather =
    useCallback(
      async (locationQuery) => {
        setIsLoading(true);

        setErrorMessage("");

        try {
          const data =
            await getWeatherByCity(
              locationQuery
            );

          setWeatherData(data);

          setCity(
            data.location.displayName
          );
        } catch (error) {
          setErrorMessage(
            error.message ||
              "Weather information could not be loaded."
          );
        } finally {
          setIsLoading(false);
        }
      },
      []
    );


  // ----------------------------------------------------------
  // INITIAL APPLICATION LOAD
  // ----------------------------------------------------------

  /**
   * Load default weather information once when the application
   * mounts.
   */
  useEffect(() => {
    loadWeather("Vancouver");
  }, [loadWeather]);


  // ----------------------------------------------------------
  // EVENT HANDLERS
  // ----------------------------------------------------------

  /**
   * Handles a valid city/location submitted by SearchBar.
   *
   * @param {string} selectedCity
   * User-entered location.
   *
   * @returns {Promise<void>}
   */
  async function handleCitySearch(
    selectedCity
  ) {
    await loadWeather(
      selectedCity
    );
  }


  /**
   * Toggles shared temperature presentation between Celsius
   * and Fahrenheit.
   *
   * The underlying Open-Meteo data remains Celsius; only the
   * display representation changes.
   *
   * @returns {void}
   */
  function handleToggleUnit() {
    setUnit(
      (currentUnit) =>
        currentUnit === "C"
          ? "F"
          : "C"
    );
  }


  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <div className="app">
      <Header />

      <main
        className="app-main"
        aria-busy={isLoading}
      >
        <SearchBar
          city={city}
          onSearch={
            handleCitySearch
          }
          isLoading={
            isLoading
          }
        />

        {isLoading && (
          <section
            className="status-panel"
            role="status"
            aria-live="polite"
          >
            <div
              className="loading-spinner"
              aria-hidden="true"
            />

            <p>
              Loading weather
              information...
            </p>
          </section>
        )}

        {errorMessage &&
          !isLoading && (
            <section
              className="
                status-panel
                status-error
              "
              role="alert"
            >
              <h2>
                Unable to Load
                Weather
              </h2>

              <p>
                {errorMessage}
              </p>
            </section>
          )}

        {weatherData &&
          !isLoading && (
            <>
              <WeatherCard
                city={
                  weatherData
                    .location
                    .displayName
                }
                weather={
                  weatherData
                    .current
                }
                unit={unit}
                onToggleUnit={
                  handleToggleUnit
                }
              />

              <HourlyForecast
                forecast={
                  weatherData
                    .hourly
                }
                unit={unit}
              />

              <DailyForecast
                forecast={
                  weatherData
                    .daily
                }
                unit={unit}
              />
            </>
          )}
      </main>

      <Footer />
    </div>
  );
}

export default App;