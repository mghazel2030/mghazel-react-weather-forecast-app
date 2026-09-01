// ============================================================
// File name: Footer.jsx
// ============================================================
// Objective:
// Provide application ownership and weather-data attribution.
//
// STEP 6 Addition:
// Open-Meteo weather-data attribution is displayed because
// Open-Meteo data is provided under CC BY 4.0.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 6.0
// ============================================================


/**
 * Application footer.
 *
 * @returns {JSX.Element}
 * Copyright and Open-Meteo attribution.
 */
function Footer() {
  return (
    <footer
      className="app-footer"
    >
      <p>
        © 2026 M Ghazel |
        React Weather Forecasting
        App
      </p>

      <p
        className="
          weather-attribution
        "
      >
        Weather data by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open-Meteo.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;