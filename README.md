# React Weather Forecasting App

A modern React + Vite weather-forecasting application developed
incrementally using a disciplined Git/GitHub feature-development
workflow.

The application allows users to search for a city or location and
retrieve live current, hourly, and seven-day forecast information using
Open-Meteo.

The project is also being used to practice professional software
development concepts including component architecture, state
management, asynchronous APIs, service layers, automated testing,
GitHub Pull Requests, Continuous Integration, and deployment.

---

## Project Status

**Current Development Stage: STEP 6 of 7 — Complete**

STEP 6 replaces the static/sample weather information introduced in
earlier stages with live Open-Meteo data and introduces the project's
first automated behavioral test suite.

STEP 6 is not considered complete until the feature is reviewed,
integrated through `develop`, released to `main`, and all CI checks pass.

**FINAL VERSION — COMPLETE AND PRODUCTION DEPLOYED**

The seven-step implementation lifecycle and final-touches refinement
are complete.

Production application:

https://mghazel-react-weather-forecast-app.onrender.com/

---

## Project Objectives

The major objectives are to:

- Build a responsive React weather-forecasting application.
- Apply React component architecture.
- Practice JSX, props, state, React Hooks, forms, and events.
- Integrate live external REST APIs.
- Separate UI code from external service/integration code.
- Normalize third-party data into an application-specific data model.
- Handle asynchronous loading and failure states.
- Implement automated unit and component tests.
- Implement Continuous Integration using GitHub Actions.
- Practice professional Git/GitHub branching and Pull Request workflows.
- Prepare the application for final production deployment.

---

## Current Features

As of STEP 6, the application includes:

- Responsive React + Vite interface.
- Professional weather-dashboard layout.
- Controlled city/location search form.
- Input validation.
- Clear button.
- Live Open-Meteo geocoding.
- Live current-weather retrieval.
- Live hourly forecast retrieval.
- Live seven-day forecast retrieval.
- Celsius/Fahrenheit presentation toggle.
- Current temperature.
- Feels-like temperature.
- Relative humidity.
- Wind speed.
- Today's maximum UV index.
- Sunrise.
- Sunset.
- Human-readable WMO weather conditions.
- WMO-derived weather symbols.
- Next-12-hours forecast.
- Seven-day high/low forecast.
- Loading feedback.
- API/network error feedback.
- Responsive mobile layout.
- Open-Meteo attribution.
- Unit tests.
- React component tests.
- Weather-data normalization tests.
- GitHub Actions Continuous Integration.

---

## Technology Stack

| Category | Technology |
|---|---|
| Front End | React |
| Build Tool | Vite |
| Language | JavaScript / JSX |
| Styling | CSS3 |
| Weather Data | Open-Meteo Forecast API |
| Geocoding | Open-Meteo Geocoding API |
| HTTP | Browser Fetch API |
| Asynchronous Programming | Promises + async/await |
| Unit Testing | Vitest |
| React Testing | React Testing Library |
| User Interaction Testing | Testing Library user-event |
| Test DOM | jsdom |
| Version Control | Git |
| Repository / Pull Requests | GitHub |
| Continuous Integration | GitHub Actions |
| Package Manager | npm |

---

# Application Architecture

STEP 6 introduces a dedicated external-service boundary.

```text
                    USER
                      │
                      ▼
                  SearchBar
                      │
                location text
                      │
                      ▼
                    App.jsx
                      │
                      ▼
              weatherService.js
                      │
              ┌───────┴────────┐
              │                │
              ▼                │
      Open-Meteo Geocoding     │
              │                │
       latitude/longitude      │
              │                │
              └───────┬────────┘
                      │
                      ▼
        Open-Meteo Forecast API
                      │
                 Raw JSON
                      │
                      ▼
           normalizeWeatherData()
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
     Current        Hourly        Daily
      Model          Model         Model
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
                 React State
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
 WeatherCard   HourlyForecast   DailyForecast
```

---

# Why Use a Service Layer?

A React component should primarily be concerned with interface behavior
and presentation.

Without a service abstraction, `App.jsx` would need to understand:

- Open-Meteo endpoint construction.
- URL query parameters.
- HTTP status handling.
- Geocoding data.
- Forecast data.
- Provider-specific field names.
- Parallel time-series arrays.
- WMO weather codes.
- Error translation.

Instead:

```text
App.jsx
    =
React state + application orchestration

weatherService.js
    =
external API communication + normalization

weatherUtils.js
    =
pure conversion/formatting logic
```

This reduces coupling and improves maintainability.

---

# Open-Meteo Integration

The application uses two Open-Meteo services.

## 1. Geocoding

A user enters a location such as:

```text
Vancouver
```

The Geocoding API resolves it to information such as:

```text
name
administrative region
country
latitude
longitude
timezone
```

The current STEP 6 implementation uses the first matching geocoding
result.

---

## 2. Weather Forecast

Latitude and longitude are then passed to the Open-Meteo Forecast API.

The application requests:

### Current Weather

```text
temperature_2m
relative_humidity_2m
apparent_temperature
weather_code
wind_speed_10m
```

### Hourly Forecast

```text
temperature_2m
weather_code
```

### Daily Forecast

```text
weather_code
temperature_2m_max
temperature_2m_min
sunrise
sunset
uv_index_max
```

Weather timestamps are requested using:

```text
timezone=auto
```

so forecast times correspond to the searched location.

---

# Open-Meteo Data Normalization

Open-Meteo frequently represents forecast data using parallel arrays.

Example:

```javascript
hourly: {
  time: [
    "2026-08-31T18:00",
    "2026-08-31T19:00"
  ],

  temperature_2m: [
    18,
    17
  ],

  weather_code: [
    2,
    3
  ]
}
```

The service layer transforms this into application-oriented objects:

```javascript
[
  {
    time: "6 PM",
    temperatureCelsius: 18,
    weatherCode: 2,
    condition: "Partly Cloudy",
    weatherSymbol: "⛅"
  },

  {
    time: "7 PM",
    temperatureCelsius: 17,
    weatherCode: 3,
    condition: "Overcast",
    weatherSymbol: "☁️"
  }
]
```

React components therefore do not need to coordinate corresponding
array indices.

---

# WMO Weather Codes

Open-Meteo returns numeric WMO weather interpretation codes.

The project's `weatherUtils.js` translates those codes into
human-readable conditions and weather symbols.

Examples:

| Code | Condition | Symbol |
|---:|---|---|
| 0 | Clear Sky | ☀️ |
| 1 | Mainly Clear | 🌤️ |
| 2 | Partly Cloudy | ⛅ |
| 3 | Overcast | ☁️ |
| 45 / 48 | Fog | 🌫️ |
| 61–65 | Rain | 🌧️ |
| 71–75 | Snow | ❄️ |
| 95–99 | Thunderstorm | ⛈️ |

This mapping keeps provider-specific numeric codes out of the React
presentation components.

---

# Async Request State

STEP 6 explicitly models three important asynchronous states.

```text
                  Search
                    │
                    ▼
                 Loading
                    │
             ┌──────┴──────┐
             ▼             ▼
          Success        Failure
             │             │
             ▼             ▼
       weatherData     errorMessage
```

## Loading State

While the API request is active:

```javascript
isLoading === true
```

The UI:

- Displays a loading indicator.
- Changes Search to `Searching...`.
- Disables search input.
- Disables Search.
- Disables Clear.

---

## Success State

On success:

```javascript
weatherData
```

contains normalized current, hourly, and daily information.

---

## Error State

Weather-service failures populate:

```javascript
errorMessage
```

Examples include:

- No matching location.
- Geocoding failure.
- Forecast request failure.
- Network failure.

---

# Form Validation vs API Errors

These are deliberately separate concerns.

## Form Validation

Handled inside:

```text
SearchBar.jsx
```

Example:

```text
Please enter a city or location.
```

No network request is made.

## API / Data Errors

Handled through:

```text
weatherService.js
        ↓
App.jsx
```

Example:

```text
No location was found for "xyz".
```

---

# Temperature Units

Open-Meteo is requested in Celsius:

```text
temperature_unit=celsius
```

The application stores the returned Celsius values and performs
Fahrenheit conversion locally.

```text
Open-Meteo Celsius
       ↓
Application State
       ↓
formatTemperature()
       ↓
Celsius or Fahrenheit presentation
```

This means changing units does not require another API request.

---

# Project Structure

```text
mghazel-react-weather-forecast-app/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── src/
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   │
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBar.test.jsx
│   │   │
│   │   ├── WeatherCard/
│   │   │   └── WeatherCard.jsx
│   │   │
│   │   ├── HourlyForecast/
│   │   │   └── HourlyForecast.jsx
│   │   │
│   │   ├── DailyForecast/
│   │   │   └── DailyForecast.jsx
│   │   │
│   │   └── Footer/
│   │       └── Footer.jsx
│   │
│   ├── services/
│   │   ├── weatherService.js
│   │   └── weatherService.test.js
│   │
│   ├── utils/
│   │   ├── weatherUtils.js
│   │   └── weatherUtils.test.js
│   │
│   ├── test/
│   │   └── setup.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── vitest.config.js
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/mghazel2030/mghazel-react-weather-forecast-app.git
```

Enter the project:

```bash
cd mghazel-react-weather-forecast-app
```

Install dependencies:

```bash
npm install
```

---

# Run the Application

Start the Vite development server:

```bash
npm run dev
```

Open the URL displayed by Vite.

No Open-Meteo API key is required for the free non-commercial API used
by this project.

An Internet connection is required for live weather requests.

---

# Production Build

Create a production build:

```bash
npm run build
```

The generated application is written to:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

# Automated Testing

STEP 6 introduces automated testing with:

```text
Vitest
React Testing Library
Testing Library user-event
jsdom
```

---

## Utility Tests

`weatherUtils.test.js` tests deterministic functions such as:

- Celsius → Fahrenheit conversion.
- Temperature formatting.
- WMO code mapping.
- Weather symbols.
- Open-Meteo time formatting.

---

## Component Tests

`SearchBar.test.jsx` tests user-visible behavior:

- Entering a valid city.
- Submitting a valid city.
- Rejecting empty input.
- Clearing input.
- Disabling controls while loading.

---

## Service Normalization Tests

`weatherService.test.js` verifies the transformation:

```text
Open-Meteo-shaped fixture
          ↓
normalizeWeatherData()
          ↓
application model
```

The test deliberately avoids live API requests.

This makes tests:

```text
repeatable
fast
independent of Internet availability
independent of current weather
independent of external service uptime
```

---

# Running Tests

Interactive/watch mode:

```bash
npm test
```

Single test run:

```bash
npm run test:run
```

The single-run mode is used by Continuous Integration.

---

# Continuous Integration

GitHub Actions automatically validates code during pushes and Pull
Requests.

STEP 6 expands the CI pipeline to:

```text
Push / Pull Request
        ↓
Checkout Repository
        ↓
Set Up Node.js
        ↓
npm ci
        ↓
ESLint
        ↓
Automated Tests
        ↓
Production Build
        ↓
PASS / FAIL
```

---

## CI Quality Gates

### Lint

```bash
npm run lint
```

Question:

> Does the source satisfy configured static code-quality rules?

---

### Tests

```bash
npm run test:run
```

Question:

> Does selected application behavior work as expected?

---

### Build

```bash
npm run build
```

Question:

> Can Vite successfully create the production application?

---

## Why All Three Matter

```text
Lint passes
    ≠
behavior is correct

Tests pass
    ≠
production build works

Build succeeds
    ≠
application behavior is correct
```

Together:

```text
LINT
  +
TEST
  +
BUILD
```

provide stronger confidence.

## CSS Architecture

The final-touches release introduces **selective CSS Modules** to improve
component-level style encapsulation.

Earlier project versions kept most presentation rules inside:

```text
src/App.css
```

## Responsive Design

The final application is designed to adapt across desktop, laptop,
tablet, and mobile device widths.

The final-touches release specifically verifies and refines:

- flexible content widths,
- responsive search controls,
- one-column current-weather layouts,
- responsive metric grids,
- horizontally scrollable hourly forecasts,
- mobile daily-forecast layouts,
- responsive Chart.js visualization,
- narrow-screen typography and spacing.

Primary verification sizes include approximately:

```text
1440 px — Desktop
1024 px — Laptop
 768 px — Tablet
 390 px — Mobile
 320 px — Small Mobile
```

---

# Continuous Integration vs Continuous Deployment

## CI

Current STEP 6 focus:

```text
Code
 ↓
Lint
 ↓
Test
 ↓
Build
 ↓
PASS / FAIL
```

CI answers:

> Is this change healthy enough to integrate?

---

## CD

STEP 7 target:

```text
main
 ↓
CI PASS
 ↓
production deployment
 ↓
Render
 ↓
live verification
```

CD answers:

> How does an approved application release reach production?

---

# Open-Meteo API Configuration and Security

The application uses the Open-Meteo free API for its educational,
non-commercial use case.

This API does not require an application API key.

Therefore the project currently requires no weather credential in:

```text
source code
.env
Git
GitHub Actions Secrets
deployment configuration
```

This reduces credential-management complexity.

The `.gitignore` nevertheless contains standard environment-file rules
as a security precaution for future integrations.

If a future API requires a truly private credential, that secret should
generally be held in a trusted backend/server environment rather than
embedded into browser-delivered JavaScript.

---

# Open-Meteo Attribution

Weather and geocoding information are provided by **Open-Meteo**.

Open-Meteo data is provided under the CC BY 4.0 licence and requires
attribution.

The React application's footer therefore displays:

```text
Weather data by Open-Meteo.com
```

---


# Seven-Step Development Methodology

This project is intentionally implemented incrementally rather than
building the final application in one large step.

---

## STEP 1 — Project Setup

Focus:

- Git.
- GitHub.
- VS Code.
- Node.js.
- npm.
- React.
- Vite.
- Project structure.
- Branch strategy.

Outcome:

A clean React/Vite development environment and professional Git/GitHub
repository structure.

---

## STEP 2 — JSX and Components

Focus:

- JSX.
- Reusable components.
- Component composition.

Components introduced included:

```text
Header
SearchBar
WeatherCard
Footer
```

Outcome:

The initial interface was decomposed into reusable React components.

---

## STEP 3 — Props, State, and Hooks

Focus:

- Props.
- `useState`.
- Shared state.
- Parent → child data flow.
- Child → parent callbacks.

Outcome:

The application became interactive while demonstrating React's state
and component-data-flow model.

---

## STEP 4 — Forms and Events

Focus:

- Controlled React forms.
- `onChange`.
- `onSubmit`.
- `preventDefault()`.
- Validation.
- Clear behavior.
- Accessibility.

Outcome:

Users could interact with a properly controlled React location-search
form.

---

## STEP 5 — Professional UI + CI Foundation

Focus:

- Professional weather dashboard.
- Responsive styling.
- Current-weather presentation.
- Hourly forecast presentation.
- Seven-day forecast presentation.
- GitHub Actions.
- Initial README documentation.

STEP 5 CI:

```text
npm ci
 ↓
lint
 ↓
build
```

Outcome:

A polished but sample-data-based weather interface and the project's
first Continuous Integration workflow.

---

## STEP 6 — Live Weather + Automated Testing + Expanded CI

**Completed.**


Focus:

- Open-Meteo Geocoding API.
- Open-Meteo Forecast API.
- Fetch API.
- Promises.
- `async` / `await`.
- Service-layer architecture.
- Provider-data normalization.
- WMO weather codes.
- Loading states.
- API error handling.
- Vitest.
- React Testing Library.
- Automated component tests.
- Automated normalization tests.
- Expanded GitHub Actions CI.

STEP 6 CI:

```text
npm ci
 ↓
lint
 ↓
tests
 ↓
build
```

Outcome:

The application transitions from sample weather information to live
weather data while CI begins checking selected application behavior.

### STEP 6 Completion Status

STEP 6 was successfully implemented, automatically tested, reviewed,
integrated through the `develop` branch, and validated through the
GitHub Actions Continuous Integration pipeline.

The application now uses live Open-Meteo weather information and the
CI pipeline verifies:

```text
npm ci
 ↓
lint
 ↓
automated tests
 ↓
production build


---

## STEP 7 — Final Production Release

Planned focus:

- Final application polish.
- Comprehensive regression testing.
- Additional automated tests.
- Final accessibility review.
- Final responsive review.
- Production configuration.
- Render deployment.
- Continuous Deployment.
- Production verification.
- Final GitHub release.
- Final README documentation.

---

# Three-Part Development Process

Each major application step follows a consistent three-part lifecycle.

---

## Part 1 — Repository Preparation

```text
Synchronize main
 ↓
Synchronize develop
 ↓
Verify baseline
 ↓
Verify CI
 ↓
Create feature branch
```

Purpose:

Start every feature from a known-good and reproducible baseline.

---

## Part 2 — Implementation

```text
Conceptual Tutorial
 ↓
Architecture
 ↓
Implementation
 ↓
Documentation
 ↓
Verification
 ↓
Tests
 ↓
CI Update
```

Purpose:

Understand and implement the new functionality before integrating it.

---

## Part 3 — Integration and Release

```text
feature
 ↓
CI
 ↓
Pull Request
 ↓
develop
 ↓
CI
 ↓
Release Pull Request
 ↓
main
 ↓
CI
```

Purpose:

Separate development, integration, review, and stable release.

---

# Git Branching Strategy

The project uses two long-lived branches:

```text
main
develop
```

and temporary feature branches:

```text
feature/step-XX-description
```

For STEP 6:

```text
feature/step-06-weather-api-testing
```

---

## `main`

Represents stable/released project versions.

---

## `develop`

Integration branch for completed/reviewed features before release.

---

## Feature Branches

Used for isolated development.

Example:

```text
develop
   ↓
feature/step-06-weather-api-testing
   ↓
implementation
   ↓
CI
   ↓
PR
   ↓
develop
```

---

# Benefits of the Incremental Development Strategy

The seven-step process provides:

- Smaller changes.
- Easier debugging.
- Clear milestones.
- Better Git history.
- Safer integration.
- Easier Pull Request review.
- Better traceability.
- Progressive learning.
- Progressive documentation.
- Progressive CI/CD maturity.

Instead of:

```text
huge application
 ↓
one huge commit
 ↓
difficult debugging
```

we obtain:

```text
small feature
 ↓
verify
 ↓
commit
 ↓
CI
 ↓
review
 ↓
integrate
```

---

# STEP 6 Lessons Learned

Key lessons include:

1. External REST APIs should be isolated behind service abstractions.

2. UI components should not depend directly on third-party response
   formats.

3. Open-Meteo returns much forecast information as parallel time-series
   arrays, which should be converted into application-friendly objects.

4. A geocoding request can transform a human-readable location into
   geographic coordinates before a weather request is made.

5. `async` / `await` makes Promise-based network workflows easier to
   read and maintain.

6. Network operations require explicit loading, success, and error
   states.

7. Form-validation errors and API errors belong to different layers.

8. Open-Meteo WMO codes can be mapped into presentation-friendly
   descriptions and symbols.

9. Temperature-unit changes can be performed locally without making a
   second weather request.

10. Automated unit tests should avoid unnecessary dependencies on live
    third-party APIs.

11. A successful production build does not prove behavior is correct.

12. CI becomes considerably more valuable when it validates lint,
    tests, and production build.

13. API credential requirements depend on the selected provider;
    Open-Meteo's free non-commercial API does not require an API key.

14. Even when an application currently has no secrets, a professional
    `.gitignore` remains valuable.

---

# Current Limitations

As of STEP 6:

- City search uses the first Open-Meteo geocoding result.
- Ambiguous locations are not yet presented for user selection.
- Browser geolocation is not yet implemented in the React version.
- The temperature trend chart is not yet implemented in this React
  version.
- Test coverage is foundational rather than comprehensive.
- The application depends on Internet connectivity and Open-Meteo
  availability.
- Open-Meteo free API usage is subject to its service terms and rate
  limits.
- Production deployment is not yet complete.
- Continuous Deployment is not yet implemented.
- Comprehensive final regression testing remains for STEP 7.

---

# Proposed Future Improvements

Potential improvements include:

- Browser geolocation.
- Multiple geocoding-result selection.
- Location autocomplete.
- Weather-data caching.
- Request cancellation using `AbortController`.
- Debounced search.
- Precipitation probability.
- Wind direction.
- Weather alerts where appropriate.
- Daily temperature trend visualization.
- Chart.js or another charting solution.
- Improved weather icons.
- Dark/light theme.
- Additional accessibility testing.
- Expanded component tests.
- App-level integration tests.
- Error-boundary strategy.
- End-to-end browser tests.
- Branch protection / required CI checks.
- Render deployment.
- Continuous Deployment from the stable release branch.

---

# Testing Commands

Run all tests interactively:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Run ESLint:

```bash
npm run lint
```

Build production application:

```bash
npm run build
```

---

# Local STEP 6 Quality Gate

Before committing STEP 6:

```text
npm run lint
      ↓
npm run test:run
      ↓
npm run build
      ↓
brief manual smoke test
      ↓
git diff
      ↓
git diff --staged
```

All stages should succeed before the STEP 6 feature is released.

---

# Author

**M Ghazel**

React Weather Forecasting App  
2026