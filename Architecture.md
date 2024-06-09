# Architecture

## Overview
The Pomodoro Timer Chrome Extension is structured to separate concerns between background tasks, options page interactions, and popup interactions.

## Components

### Background Script (background.js)
- **Alarms:** Manages creating and handling alarms to trigger timer events.
- **State Management:** Handles the timer state, including start, stop, and reset functionality.

### Options Page (options.js)
- **User Settings:** Allows users to set their preferred work and break intervals.
- **Event Handlers:** Listens for changes and updates the local storage accordingly.

### Popup (popup.js)
- **UI Management:** Handles the display of the timer and task list in the popup.
- **State Updates:** Updates the timer display and progress bar based on the current state.

## Data Flow
- **Local Storage:** Used to store timer settings and state.
- **Alarms:** Used to trigger periodic updates and notifications.
- **Popup and Options:** Interact with local storage to get and set user preferences.