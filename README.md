# React Weather Forecasting App

A responsive React + Vite weather forecasting application developed
through a disciplined seven-step software-development process.

The project progressively introduces modern React concepts, Git/GitHub
branching and Pull Request workflows, Continuous Integration, API-based
weather retrieval, testing, and production deployment.

> **Current Development Status:** STEP 5 of 7  
> STEP 5 introduces the professional UI foundation, forecast-component
> architecture, GitHub Actions Continuous Integration, and expanded
> project documentation.

---

## 1. Project Overview

The React Weather Forecasting App provides an interactive user interface
for searching weather information by city or location.

The project is being developed incrementally rather than as one large
implementation. Each major development step introduces a focused set of
React, software-engineering, Git/GitHub, testing, or deployment concepts.

The final application is intended to provide a professional weather
dashboard containing current weather conditions, short-term forecasts,
multi-day forecasts, useful weather metrics, responsive presentation,
and production deployment.

---

## 2. Project Objectives

The major objectives are to:

- Develop a responsive weather forecasting application using React.
- Apply reusable component-based front-end architecture.
- Practice JSX, props, state, Hooks, events, and controlled forms.
- Integrate real weather information through an external API.
- Implement responsive and accessible user-interface design.
- Practice disciplined Git and GitHub branch management.
- Use Pull Requests for feature integration and release promotion.
- Introduce automated Continuous Integration using GitHub Actions.
- Add testing and production-quality verification.
- Deploy the completed application to a production hosting environment.
- Document the complete engineering process and lessons learned.

---

## 3. Current Features

As of STEP 5, the application includes:

- React + Vite project architecture
- Reusable functional React components
- Controlled location-search form
- React event handling
- Input validation
- Parent/child state communication
- Celsius/Fahrenheit display switching
- Current-weather dashboard component
- Short-term hourly forecast component
- Seven-day forecast component
- Responsive desktop/mobile presentation
- Accessibility-oriented form markup
- Git feature/develop/main workflow
- Pull Request-based integration/release workflow
- GitHub Actions Continuous Integration
- ESLint quality checks
- Automated production-build verification

### STEP 5 Data Limitation

Weather and forecast values used during STEP 5 are sample presentation
data. Real weather information will be connected during a later
development step.

---

## 4. Technology Stack

| Category | Technology |
|---|---|
| Front End | React |
| Build Tool | Vite |
| Language | JavaScript / JSX |
| Styling | CSS |
| Package Management | npm |
| Source Control | Git |
| Repository Hosting | GitHub |
| CI | GitHub Actions |
| Linting | ESLint |
| Production Build | Vite |
| Weather API | Planned for a later step |
| Deployment | Planned for STEP 7 |

---

## 5. High-Level Application Architecture

```text
App
│
├── Header
│
├── SearchBar
│   ├── Controlled input
│   ├── Local form state
│   ├── Validation
│   └── onSearch callback
│
├── WeatherCard
│   ├── Current temperature
│   ├── Conditions
│   └── Weather metrics
│
├── HourlyForecast
│   └── Short-term forecast cards
│
├── DailyForecast
│   └── Seven-day forecast rows
│
└── Footer