// ============================================================
// File name: TemperatureChart.jsx
// ============================================================
// Objective:
// Display the seven-day high/low temperature trend.
//
// FINAL-TOUCHES:
// - Scoped CSS Module.
// - Accessibility description added.
// - Responsive container retained.
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
// ============================================================

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import {
  Line,
} from "react-chartjs-2";

import {
  celsiusToFahrenheit,
} from "../../utils/weatherUtils";

import styles from
  "./TemperatureChart.module.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function TemperatureChart({
  forecast,
  unit,
  theme,
}) {
  const convertTemperature =
    (value) =>
      unit === "F"
        ? celsiusToFahrenheit(
            value
          )
        : value;

  const labels =
    forecast.map(
      (day) =>
        day.day
    );

  const highValues =
    forecast.map(
      (day) =>
        Math.round(
          convertTemperature(
            day.highCelsius
          )
        )
    );

  const lowValues =
    forecast.map(
      (day) =>
        Math.round(
          convertTemperature(
            day.lowCelsius
          )
        )
    );

  const textColor =
    theme === "dark"
      ? "#e8edff"
      : "#28324a";

  const gridColor =
    theme === "dark"
      ? "rgba(255,255,255,0.12)"
      : "rgba(30,50,100,0.10)";

  const chartData = {
    labels,

    datasets: [
      {
        label:
          `Daily High (°${unit})`,

        data:
          highValues,

        borderColor:
          "#3b82f6",

        backgroundColor:
          "#3b82f6",

        tension:
          0.32,

        pointRadius:
          4,
      },

      {
        label:
          `Daily Low (°${unit})`,

        data:
          lowValues,

        borderColor:
          "#7c3aed",

        backgroundColor:
          "#7c3aed",

        tension:
          0.32,

        pointRadius:
          4,
      },
    ],
  };

  const options = {
    responsive:
      true,

    maintainAspectRatio:
      false,

    interaction: {
      mode:
        "index",

      intersect:
        false,
    },

    plugins: {
      legend: {
        labels: {
          color:
            textColor,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color:
            textColor,
        },

        grid: {
          color:
            gridColor,
        },
      },

      y: {
        ticks: {
          color:
            textColor,

          callback:
            (value) =>
              `${value}°`,
        },

        grid: {
          color:
            gridColor,
        },
      },
    },
  };

  return (
    <section
      className={
        styles.section
      }
      aria-labelledby="
        temperature-chart-heading
      "
    >
      <header
        className={
          styles.header
        }
      >
        <p
          className={
            styles.eyebrow
          }
        >
          Forecast Visualization
        </p>

        <h2
          id="
            temperature-chart-heading
          "
        >
          Weekly Temperature
          Trend
        </h2>
      </header>

      <p
        className="sr-only"
      >
        Seven-day temperature
        trend showing daily high
        and low temperatures in
        degrees {unit}.
      </p>

      <div
        className={
          styles.container
        }
      >
        <Line
          data={chartData}
          options={options}
        />
      </div>
    </section>
  );
}

export default TemperatureChart;