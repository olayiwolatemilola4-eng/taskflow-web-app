# TaskFlow

TaskFlow is a clean, professional todo list web application built for a Stage 1 AI-assisted development project.

## Features

- Add tasks with a priority and optional due date
- Edit, delete, and complete tasks
- Add quickly with Enter
- Search tasks and filter by All, Active, or Completed
- View total and completed task counts
- Light and dark themes
- Responsive layout for desktop, tablet, and mobile
- Persistent tasks and theme preference

## Technology

HTML, CSS, and vanilla JavaScript only. No dependencies or build step are required.

## Run locally

Open `index.html` in any modern web browser.

## Storage

Tasks are saved in the browser's `localStorage` under `taskflow-tasks`. The selected theme is saved under `taskflow-theme`, so both remain after refreshes in the same browser.

## Test checklist

Add a task with the button and another by pressing Enter. Edit a task, mark it complete, use search and each filter, and delete it. Refresh to verify persistence. Switch the theme and refresh again. Finally, resize the browser to a narrow mobile width and confirm controls remain usable.
