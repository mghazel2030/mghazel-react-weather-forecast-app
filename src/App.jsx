//==================================================
// File name: App.jsx
//==================================================
// Description:
// Root component for the Weather Forecasting App.
//
// STEP 4 extends the application with React form/event
// handling. App owns the selected application city while
// SearchBar manages draft form input locally.
//
// Processing Workflow:
// 1. Initialize application-level state.
// 2. Pass the selected city to child components.
// 3. Receive a validated city from SearchBar.
// 4. Update the selected city state.
// 5. Re-render child components with updated props.
// 6. Maintain temperature-unit functionality introduced
//    during STEP 3.
//
// Date: 31-Aug-2026
// Author: mghazel
// Version: 4.0
//==================================================

import { useState } from "react";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Footer from "./components/Footer/Footer";

import "./App.css";

/**
 * Root component for the Weather Forecasting App.
 *
 * Maintains application-level weather state and coordinates
 * data flow between the search and weather-display components.
 *
 * @returns {JSX.Element} The complete application interface.
 */
function App() {
  // --------------------------------------------------
  // State: Selected Location
  // --------------------------------------------------
  const [city, setCity] = useState("Calgary");

  // --------------------------------------------------
  // State: Temperature Unit
  // --------------------------------------------------
  const [unit, setUnit] = useState("C");

  // --------------------------------------------------
  // State: Sample Weather Information
  // --------------------------------------------------
  const [weather] = useState({
    temperatureCelsius: 21,
    humidity: 52,
    windSpeed: 14,
    condition: "Partly Cloudy",
  });

  /**
   * Updates the selected application city.
   *
   * SearchBar performs input-level validation before
   * invoking this callback.
   *
   * @param {string} selectedCity
   * Validated city or location entered by the user.
   *
   * @returns {void}
   */
  function handleCitySearch(selectedCity) {
    setCity(selectedCity);
  }

  /**
   * Toggles the displayed temperature unit between Celsius
   * and Fahrenheit.
   *
   * @returns {void}
   */
  function handleToggleUnit() {
    setUnit((currentUnit) =>
      currentUnit === "C" ? "F" : "C"
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <SearchBar
          city={city}
          onSearch={handleCitySearch}
        />

        <WeatherCard
          city={city}
          weather={weather}
          unit={unit}
          onToggleUnit={handleToggleUnit}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;