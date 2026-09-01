// ============================================================
// File name: setup.js
// ============================================================
// Objective:
// Provide common initialization for all Vitest tests.
//
// Responsibilities:
// 1. Add React Testing Library / jest-dom matchers.
// 2. Clean up the rendered DOM after every test.
//
// Examples of matchers enabled by jest-dom:
//
//     toBeInTheDocument()
//     toBeDisabled()
//     toHaveValue()
//     toHaveTextContent()
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.1
// ============================================================

import "@testing-library/jest-dom/vitest";

import {
  cleanup,
} from "@testing-library/react";

import {
  afterEach,
} from "vitest";


/**
 * Removes React-rendered DOM content after every test so that
 * each test starts with an isolated, clean document.
 */
afterEach(() => {
  cleanup();
});