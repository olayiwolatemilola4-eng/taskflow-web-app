# TaskFlow Agent Guide

## Project
TaskFlow is a polished, browser-based todo list for a Stage 1 AI-assisted development project. Its purpose is to make everyday tasks easy to capture, prioritize, and track.

## Stack and structure
This project is dependency-free and uses only HTML, CSS, and vanilla JavaScript.

- `index.html` contains the accessible page structure and edit dialog.
- `style.css` contains the responsive design, theme variables, and UI states.
- `script.js` contains task state, localStorage, rendering, filters, and event handlers.
- `README.md` explains use and testing.

## Design principles
Keep the interface clean, calm, spacious, and professional. Use the existing neutral palette and blue accent. Maintain clear focus states, semantic controls, keyboard support, and responsive behavior.

## Coding conventions
Use readable names, small functions, and plain modern JavaScript. Keep user-facing text clear. Prefer `textContent` when rendering task content. Do not introduce frameworks, package managers, build tools, or external dependencies.

## Functionality to preserve
Tasks must add with Enter or the button, edit, delete, toggle completion, store priority and optional due date, persist after reload, search by text, and filter by All, Active, and Completed. Statistics, empty states, and the light/dark setting must update correctly.

## Testing changes
Open `index.html` in a modern browser. Add tasks with different priorities and dates; refresh; edit, complete, and delete tasks; use every filter and search; switch themes and refresh; test a narrow mobile viewport. Check the browser console for errors.
