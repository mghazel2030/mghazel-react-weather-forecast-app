// ============================================================
// File name: vitest.config.js
// ============================================================
// Objective:
// Configure Vitest for testing the React Weather Forecasting
// App.
//
// Why jsdom?
// Vitest normally executes JavaScript in a Node.js environment.
// React Testing Library requires browser DOM objects such as:
//
//     document
//     window
//     HTMLElement
//
// jsdom provides those browser-like APIs during automated
// component tests.
//
// Configuration:
// - jsdom: browser-like DOM environment.
// - setupFiles: common test initialization.
// - css: allow components importing CSS to be tested.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.1
// ============================================================

import {
  defineConfig,
} from "vitest/config";

import react from
  "@vitejs/plugin-react";


export default defineConfig({
  plugins: [
    react(),
  ],

  test: {
    environment:
      "jsdom",

    setupFiles: [
      "./src/test/setup.js",
    ],

    css:
      true,
  },
});