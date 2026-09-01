// ============================================================
// File name: App.jsx
// ============================================================
// Objective:
// Root application controller for the final React Weather
// Forecasting App.
//
// STEP 7 Responsibilities:
// - Load default live weather.
// - Search by city.
// - Search by current geographic location.
// - Manage loading/error states.
// - Clear displayed weather.
// - Manage Celsius/Fahrenheit.
// - Manage light/dark theme.
// - Coordinate current/hourly/daily/chart components.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 7.0
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

import TemperatureChart from
  "./components/TemperatureChart/TemperatureChart";

import Footer from
  "./components/Footer/Footer";

import {
  getWeatherByCity,
  getWeatherByCoordinates,
} from "./services/weatherService";

import {
  getCurrentCoordinates,
} from "./services/geolocationService";

import "./App.css";


const DEFAULT_CITY =
  "Vancouver";


/**
 * Root weather application component.
 *
 * @returns {JSX.Element} Application UI.
 */
function App() {
  const [
    city,
    setCity,
  ] = useState(
    DEFAULT_CITY
  );

  const [
    unit,
    setUnit,
  ] = useState("C");

  const [
    weatherData,
    setWeatherData,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    theme,
    setTheme,
  ] = useState(
    () =>
      localStorage.getItem(
        "weather-theme"
      ) ?? "light"
  );


  /**
   * Apply and persist the active presentation theme.
   */
  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      "weather-theme",
      theme
    );
  }, [theme]);


  /**
   * Loads weather by a city/location string.
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


  /**
   * Load Vancouver as the initial weather location.
   */
  useEffect(() => {
    loadWeather(
      DEFAULT_CITY
    );
  }, [loadWeather]);


  /**
   * SearchBar callback.
   */
  async function handleCitySearch(
    selectedCity
  ) {
    await loadWeather(
      selectedCity
    );
  }


  /**
   * Retrieves geographic coordinates from the browser and
   * then loads weather directly for those coordinates.
   */
  async function handleUseMyLocation() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const {
        latitude,
        longitude,
      } =
        await getCurrentCoordinates();

      const data =
        await getWeatherByCoordinates(
          latitude,
          longitude,
          "Current Location"
        );

      setWeatherData(data);

      setCity(
        data.location.displayName
      );
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Unable to retrieve weather for your current location."
      );
    } finally {
      setIsLoading(false);
    }
  }


  /**
   * Clears displayed weather while leaving the application
   * ready for another search.
   */
  function handleClearWeather() {
    setWeatherData(null);

    setErrorMessage("");

    setCity(
      "No location selected"
    );
  }


  /**
   * Toggles C/F presentation.
   */
  function handleToggleUnit() {
    setUnit(
      (currentUnit) =>
        currentUnit === "C"
          ? "F"
          : "C"
    );
  }


  /**
   * Toggles light/dark mode.
   */
  function handleToggleTheme() {
    setTheme(
      (currentTheme) =>
        currentTheme === "light"
          ? "dark"
          : "light"
    );
  }


  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={
          handleToggleTheme
        }
      />

      <main
        className="app-main"
        aria-busy={isLoading}
      >
        <SearchBar
          city={city}
          onSearch={
            handleCitySearch
          }
          onUseMyLocation={
            handleUseMyLocation
          }
          onClear={
            handleClearWeather
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
            <div
              className="
                weather-dashboard
              "
            >
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

              <TemperatureChart
                forecast={
                  weatherData
                    .daily
                }
                unit={unit}
                theme={theme}
              />
            </div>
          )}

        {!weatherData &&
          !isLoading &&
          !errorMessage && (
            <section
              className="
                empty-weather-state
              "
            >
              <span
                aria-hidden="true"
              >
                🌦️
              </span>

              <h2>
                Search for Weather
              </h2>

              <p>
                Enter a city or use
                your current location.
              </p>
            </section>
          )}
      </main>

      <Footer />
    </div>
  );
}

export default App;