# Project Overview

**2026 Dogs Scoreboard** is a Vue 3 application built with Vite. It serves as a scoreboard for a "Dog Eating" (and other activities) contest. The application visualizes data such as scores, rankings, and fun statistics for various contestants.

## Architecture & Data Flow

*   **Frontend Framework:** Vue 3 (Composition API).
*   **Build Tool:** Vite.
*   **Routing:** `vue-router` with Hash History mode.
*   **State Management:** A simple reactive object in `src/store.js`.
*   **Data Source:** Fetches data dynamically from Google Sheets (published as CSVs).
    *   **Scores:** Tracks points for dogs, creativity, and social activities.
    *   **Contestants:** Metadata about contestants (names, profile pictures).
*   **Data Parsing:** Uses `papaparse` to parse CSV data and `date-fns` for date formatting.
*   **Charts:** Uses `chart.js` and `vue-chartjs` for visualizing progress.

## Key Features

*   **Leaderboard:** Displays contestants sorted by total points.
*   **Interactive Progress Chart:** Visualizes point progression with a toggle for "Last 30 Days" vs. "All Time (Weekly)" views.
*   **Contestant Profiles:** Detailed view for each contestant showing their stats, history, and "fun facts" (e.g., equivalent calories, height in Eiffel Towers).
*   **Recent Activity:** A feed of the latest score entries.
*   **Highlights:** Automatically calculated stats like "Biggest Score Drop", "Most Creative", etc.

## Building and Running

### Prerequisites

*   Node.js installed.
*   `npm` or `pnpm` (project contains `pnpm-lock.yaml`, suggesting pnpm is preferred).

### Commands

*   **Install Dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

*   **Start Development Server:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

*   **Build for Production:**
    ```bash
    npm run build
    # or
    pnpm build
    ```

*   **Preview Production Build:**
    ```bash
    npm run preview
    # or
    pnpm preview
    ```

## Development Conventions

*   **Styles:** Global styles are in `src/assets/main.css`. Component-specific styles are likely in `<style scoped>` blocks within `.vue` files.
*   **Components:** Located in `src/components/`.
*   **Views:** Page-level components are in `src/views/`.
*   **Data Logic:** Business logic for fetching and processing data resides in `src/services/dataService.js`.
*   **Images:** Contestant images are stored in `public/images/`.

## Key Files

*   `src/services/dataService.js`: Core logic for fetching CSVs, parsing them, and calculating statistics.
*   `src/store.js`: Global reactive state.
*   `src/router/index.js`: Route definitions.
*   `src/views/HomeView.vue`: Main dashboard view.
*   `src/views/ContestantView.vue`: Individual contestant details view.
