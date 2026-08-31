//==================================================
// File name: App.jsx
//==================================================
// Description:
// Defines the root component for the Weather Forecasting App.
//
// STEP 3 introduces React state management using useState and
// demonstrates parent-to-child data flow using props.
//
// Processing Workflow:
// 1. Initialize application state.
// 2. Store the selected city.
// 3. Store sample weather information.
// 4. Store the selected temperature unit.
// 5. Pass state values to child components through props.
// 6. Update state in response to user interaction.
// 7. Allow React to re-render affected components.
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 3.0
//==================================================

import { useState } from "react";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Footer from "./components/Footer/Footer";

import "./App.css";

/**
 * Root Weather Forecasting App component.
 *
 * Manages the primary application state and passes required
 * data to child components using React props.
 *
 * @returns {JSX.Element} The complete application user interface.
 */
function App() {
  // --------------------------------------------------
  // State: Current Location
  // --------------------------------------------------
  const [city, setCity] = useState("Calgary");

  // --------------------------------------------------
  // State: Temperature Unit
  // --------------------------------------------------
  const [unit, setUnit] = useState("C");

  // --------------------------------------------------
  // State: Sample Weather Data
  // --------------------------------------------------
  const [weather] = useState({
    temperatureCelsius: 21,
    humidity: 52,
    windSpeed: 14,
    condition: "Partly Cloudy",
  });

  /**
   * Toggles the displayed temperature unit.
   *
   * The actual temperature conversion is performed in the
   * WeatherCard component based on the selected unit.
   *
   * @returns {void}
   */
  function handleToggleUnit() {
    setUnit((currentUnit) => (currentUnit === "C" ? "F" : "C"));
  }

  /**
   * Demonstrates a simple state update by rotating through
   * predefined sample cities.
   *
   * This temporary functionality is used only for STEP 3.
   * A real search form will be implemented in a later step.
   *
   * @returns {void}
   */
  function handleChangeCity() {
    setCity((currentCity) =>
      currentCity === "Calgary" ? "Toronto" : "Calgary"
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <SearchBar
          city={city}
          onChangeCity={handleChangeCity}
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