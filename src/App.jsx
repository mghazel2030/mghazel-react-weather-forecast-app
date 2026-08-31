//==================================================
// File name: App.jsx
//==================================================
// Description:
// Root component for the React Weather Forecasting App.
//
// STEP 5 evolves the application toward a production-quality
// weather dashboard. It coordinates application-level state
// and composes the search, current-weather, hourly-forecast,
// and daily-forecast components.
//
// Important:
// Weather and forecast values remain sample data during
// STEP 5. Real external weather data will be integrated in
// a later development step.
//
// Processing Workflow:
// 1. Initialize selected location.
// 2. Initialize temperature-display unit.
// 3. Define temporary sample weather/forecast data.
// 4. Receive validated city submissions from SearchBar.
// 5. Pass current-weather data to WeatherCard.
// 6. Pass hourly data to HourlyForecast.
// 7. Pass daily data to DailyForecast.
// 8. Re-render automatically following React state updates.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 5.0
//==================================================

import { useState } from "react";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import Footer from "./components/Footer/Footer";

import "./App.css";

/**
 * Root application component.
 *
 * @returns {JSX.Element} Complete weather application interface.
 */
function App() {
  // --------------------------------------------------
  // Application State
  // --------------------------------------------------

  const [city, setCity] = useState("Vancouver");

  const [unit, setUnit] = useState("C");

  // --------------------------------------------------
  // Temporary STEP 5 Sample Data
  // --------------------------------------------------
  //
  // These structures deliberately resemble data that can
  // later be populated from an external weather API.
  // --------------------------------------------------

  const currentWeather = {
    country: "Canada",
    temperatureCelsius: 18,
    feelsLikeCelsius: 17,
    humidity: 79,
    windSpeed: 6,
    uvIndex: 5.2,
    condition: "Partly Cloudy",
    weatherIcon: "⛅",
    sunrise: "06:27 AM",
    sunset: "07:57 PM",
  };

  const hourlyForecast = [
    { time: "12 PM", temperatureCelsius: 18, condition: "⛅" },
    { time: "1 PM", temperatureCelsius: 19, condition: "🌤️" },
    { time: "2 PM", temperatureCelsius: 20, condition: "🌤️" },
    { time: "3 PM", temperatureCelsius: 20, condition: "🌤️" },
    { time: "4 PM", temperatureCelsius: 21, condition: "☀️" },
    { time: "5 PM", temperatureCelsius: 21, condition: "☀️" },
    { time: "6 PM", temperatureCelsius: 20, condition: "🌤️" },
    { time: "7 PM", temperatureCelsius: 19, condition: "🌤️" },
  ];

  const dailyForecast = [
    { day: "Sun, Aug 30", highCelsius: 21, lowCelsius: 12, condition: "☁️" },
    { day: "Mon, Aug 31", highCelsius: 21, lowCelsius: 13, condition: "☁️" },
    { day: "Tue, Sep 1", highCelsius: 18, lowCelsius: 13, condition: "🌦️" },
    { day: "Wed, Sep 2", highCelsius: 14, lowCelsius: 12, condition: "🌧️" },
    { day: "Thu, Sep 3", highCelsius: 15, lowCelsius: 12, condition: "🌦️" },
    { day: "Fri, Sep 4", highCelsius: 19, lowCelsius: 12, condition: "☁️" },
    { day: "Sat, Sep 5", highCelsius: 20, lowCelsius: 13, condition: "🌤️" },
  ];

  /**
   * Updates the selected application city following a valid
   * SearchBar form submission.
   *
   * @param {string} selectedCity
   * Validated city or location.
   *
   * @returns {void}
   */
  function handleCitySearch(selectedCity) {
    setCity(selectedCity);
  }

  /**
   * Toggles the temperature-display unit.
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
          weather={currentWeather}
          unit={unit}
          onToggleUnit={handleToggleUnit}
        />

        <HourlyForecast
          forecast={hourlyForecast}
          unit={unit}
        />

        <DailyForecast
          forecast={dailyForecast}
          unit={unit}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;