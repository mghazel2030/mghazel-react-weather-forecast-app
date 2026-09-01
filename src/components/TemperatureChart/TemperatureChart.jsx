// ============================================================
// File name: TemperatureChart.jsx
// ============================================================
// Objective:
// Visualize seven-day forecast high/low temperature trends.
//
// Technology:
// Chart.js + react-chartjs-2
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 1.0
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


/**
 * Seven-day temperature trend chart.
 */
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
          forecast.map(
            (day) =>
              Math.round(
                convertTemperature(
                  day.highCelsius
                )
              )
          ),

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
          forecast.map(
            (day) =>
              Math.round(
                convertTemperature(
                  day.lowCelsius
                )
              )
          ),

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

      title: {
        display:
          false,
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
      className="
        forecast-section
        temperature-chart-section
      "
      aria-labelledby="
        temperature-chart-heading
      "
    >
      <div
        className="
          forecast-section-header
        "
      >
        <div>
          <p
            className="
              section-eyebrow
            "
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
        </div>
      </div>

      <div
        className="
          temperature-chart-container
        "
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