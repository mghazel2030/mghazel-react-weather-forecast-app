// ============================================================
// File name: vitest.config.js
// ============================================================
// Objective:
// Configure Vitest and React Testing Library.
//
// Testing Environment:
// jsdom emulates the browser DOM inside Node.js so React
// components can be rendered and interacted with during tests.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.0
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