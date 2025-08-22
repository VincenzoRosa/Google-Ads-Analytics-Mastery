# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web application for a Google Ads Performance Analysis Mastery Course. It's a single-page application (SPA) built with vanilla JavaScript, HTML5, and CSS3. The application provides training modules, interactive dashboards, and progress tracking for learning Google Ads analytics.

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Libraries**: Chart.js (via CDN), Font Awesome icons
- **No build tools**: Static files served directly

## Running the Application

### Simple Method (Open directly)
```bash
# Open index.html directly in a browser
open index.html  # macOS
start index.html  # Windows
xdg-open index.html  # Linux
```

### Local Server Method (Recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js 
npx http-server

# PHP
php -S localhost:8000
```

## Code Architecture

### Key Components

1. **Navigation System** (script.js:1-37)
   - SPA navigation between Dashboard, Modules, Progress, and Downloads sections
   - Active state management for nav links and sections
   
2. **Module System** (script.js:52-4100+)
   - `openModule()`: Creates modal popups for module content
   - `completeModule()`: Handles module completion and unlocks next module
   - `getModuleContent()`: Returns HTML content for each module (extensive content)
   - Progressive unlocking system - modules unlock sequentially

3. **Progress Tracking** (script.js)
   - `updateProgress()`: Calculates and updates visual progress indicators
   - Stores completion state in localStorage
   - Updates progress bar in navigation

4. **Interactive Features**
   - Quiz system with validation
   - Module completion tracking
   - Download functionality for PDF files

### File Structure

- `index.html`: Main structure with sections for dashboard, modules, progress, downloads
- `styles.css`: All styling including responsive design, animations, modal styles
- `script.js`: All JavaScript functionality - navigation, modules, progress, interactivity
- `Google Ads Performance Analysis Mastery Course Module [1-5].pdf`: Course materials

### Key Functions

- Module management: `openModule()`, `closeModule()`, `completeModule()`, `incompleteModule()`
- Content generation: `getModuleTitle()`, `getModuleContent()` 
- Progress: `updateProgress()`, `calculateProgress()`
- Quiz functionality: `initializeQuizzes()`, `checkAnswer()`

## Development Notes

- The application uses localStorage to persist module completion status
- All content is embedded in JavaScript (no external API calls)
- Modal system is dynamically created and injected into DOM
- No testing framework or linting setup currently exists
- Course content is stored as large HTML strings in `getModuleContent()`