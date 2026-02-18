// Settings Module

const SETTINGS_KEY = "userSettings";

// Save settings to localStorage
export function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Load settings from localStorage
export function loadSettings() {

    const data = localStorage.getItem(SETTINGS_KEY);

    if (data) {
        return JSON.parse(data);
    }

    // Default settings
    return {
        theme: "light",
        language: "English"
    };
}
