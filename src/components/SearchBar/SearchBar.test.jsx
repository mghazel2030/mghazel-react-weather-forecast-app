/**
 * @vitest-environment jsdom
 */

// ============================================================
// File name: SearchBar.test.jsx
// ============================================================
// Objective:
// Test SearchBar behavior through user-visible interactions.
//
// Tests:
// 1. Valid city submission.
// 2. Empty-input validation.
// 3. Clear-button behavior.
// 4. Loading-state control disabling.
//
// Testing Philosophy:
// React Testing Library tests the component through accessible,
// user-visible controls instead of relying on internal React
// implementation details.
//
// Environment:
// This test explicitly uses jsdom because React Testing Library
// requires browser-like DOM APIs including document and window.
//
// Author: mghazel
// Date: 31-Aug-2026
// Version: 1.1
// ============================================================

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from
  "@testing-library/user-event";

import {
  describe,
  expect,
  test,
  vi,
} from "vitest";

import SearchBar from
  "./SearchBar";


describe(
  "SearchBar",
  () => {
    /**
     * Verify that a valid city entered by the user is passed
     * to the parent onSearch callback.
     */
    test(
      "submits a valid city",
      async () => {
        const user =
          userEvent.setup();

        const onSearch =
          vi.fn();

        render(
          <SearchBar
            city="Vancouver"
            onSearch={
              onSearch
            }
            isLoading={
              false
            }
          />
        );

        const input =
          screen.getByRole(
            "textbox",
            {
              name:
                /city or location/i,
            }
          );

        await user.type(
          input,
          "Toronto"
        );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /^search$/i,
            }
          )
        );

        expect(
          onSearch
        ).toHaveBeenCalledTimes(
          1
        );

        expect(
          onSearch
        ).toHaveBeenCalledWith(
          "Toronto"
        );
      }
    );


    /**
     * Verify that submitting an empty form displays local
     * validation feedback and prevents the parent search
     * callback from running.
     */
    test(
      "rejects an empty location",
      async () => {
        const user =
          userEvent.setup();

        const onSearch =
          vi.fn();

        render(
          <SearchBar
            city="Vancouver"
            onSearch={
              onSearch
            }
            isLoading={
              false
            }
          />
        );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /^search$/i,
            }
          )
        );

        expect(
          screen.getByRole(
            "alert"
          )
        ).toHaveTextContent(
          /please enter a city or location/i
        );

        expect(
          onSearch
        ).not.toHaveBeenCalled();
      }
    );


    /**
     * Verify that Clear resets a value previously entered into
     * the controlled search field.
     */
    test(
      "clears entered text",
      async () => {
        const user =
          userEvent.setup();

        render(
          <SearchBar
            city="Vancouver"
            onSearch={
              vi.fn()
            }
            isLoading={
              false
            }
          />
        );

        const input =
          screen.getByRole(
            "textbox",
            {
              name:
                /city or location/i,
            }
          );

        await user.type(
          input,
          "Montreal"
        );

        expect(
          input
        ).toHaveValue(
          "Montreal"
        );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /clear/i,
            }
          )
        );

        expect(
          input
        ).toHaveValue("");
      }
    );


    /**
     * Verify that the application prevents additional user
     * requests while an asynchronous weather request is active.
     */
    test(
      "disables search controls while loading",
      () => {
        render(
          <SearchBar
            city="Vancouver"
            onSearch={
              vi.fn()
            }
            isLoading
          />
        );

        expect(
          screen.getByRole(
            "textbox",
            {
              name:
                /city or location/i,
            }
          )
        ).toBeDisabled();

        expect(
          screen.getByRole(
            "button",
            {
              name:
                /searching/i,
            }
          )
        ).toBeDisabled();

        expect(
          screen.getByRole(
            "button",
            {
              name:
                /clear/i,
            }
          )
        ).toBeDisabled();
      }
    );
  }
);