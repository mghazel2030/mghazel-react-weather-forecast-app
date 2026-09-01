/**
 * @vitest-environment jsdom
 */

// ============================================================
// File name: SearchBar.test.jsx
// ============================================================
// Objective:
// Final behavioral tests for city search, validation,
// geolocation action, clear behavior, and loading state.
//
// FINAL-TOUCHES NOTE:
// The input now uses type="search", which exposes the
// accessibility role "searchbox" rather than "textbox".
//
// Author: mghazel
// Date: 01-Sep-2026
// Version: 8.0
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
            onSearch={onSearch}
            onUseMyLocation={
              vi.fn()
            }
            onClear={vi.fn()}
            isLoading={false}
          />
        );

        const input =
          screen.getByRole(
            "searchbox",
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
        ).toHaveBeenCalledWith(
          "Toronto"
        );
      }
    );


    test(
      "rejects empty search",
      async () => {
        const user =
          userEvent.setup();

        const onSearch =
          vi.fn();

        render(
          <SearchBar
            city="Vancouver"
            onSearch={onSearch}
            onUseMyLocation={
              vi.fn()
            }
            onClear={vi.fn()}
            isLoading={false}
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
          /please enter a city/i
        );

        expect(
          onSearch
        ).not.toHaveBeenCalled();
      }
    );


    test(
      "calls geolocation callback",
      async () => {
        const user =
          userEvent.setup();

        const onUseMyLocation =
          vi.fn();

        render(
          <SearchBar
            city="Vancouver"
            onSearch={vi.fn()}
            onUseMyLocation={
              onUseMyLocation
            }
            onClear={vi.fn()}
            isLoading={false}
          />
        );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /use my location/i,
            }
          )
        );

        expect(
          onUseMyLocation
        ).toHaveBeenCalledTimes(
          1
        );
      }
    );


    test(
      "clear resets text and calls parent clear",
      async () => {
        const user =
          userEvent.setup();

        const onClear =
          vi.fn();

        render(
          <SearchBar
            city="Vancouver"
            onSearch={vi.fn()}
            onUseMyLocation={
              vi.fn()
            }
            onClear={onClear}
            isLoading={false}
          />
        );

        const input =
          screen.getByRole(
            "searchbox",
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

        expect(
          onClear
        ).toHaveBeenCalledTimes(
          1
        );
      }
    );


    test(
      "disables all controls while loading",
      () => {
        render(
          <SearchBar
            city="Vancouver"
            onSearch={vi.fn()}
            onUseMyLocation={
              vi.fn()
            }
            onClear={vi.fn()}
            isLoading
          />
        );

        expect(
          screen.getByRole(
            "searchbox",
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
                /use my location/i,
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