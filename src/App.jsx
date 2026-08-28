//==================================================
// File name: App.jsx
//==================================================
// Description:
// Defines the root application component for the Weather
// Forecasting App.
//
// The App component composes reusable child components to
// construct the application's primary user interface.
//
// Processing Workflow:
// 1. Render the Header component.
// 2. Render the application's main content area.
// 3. Render the SearchBar component.
// 4. Render the WeatherCard component.
// 5. Render the Footer component.
//
// Date: 28-Aug-2026
// Author: mghazel
// Version: 2.0
//==================================================

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Footer from "./components/Footer/Footer";

import "./App.css";

/**
 * Composes the main Weather Forecasting App interface.
 *
 * @returns {JSX.Element} The complete application UI.
 */
function App() {
  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <SearchBar />
        <WeatherCard />
      </main>

      <Footer />
    </div>
  );
}

export default App;