/*
options.js

Manages user settings for the Pomodoro Timer Chrome extension. This script allows users
to set their preferred work and break durations, and saves these preferences to local storage.
*/

const workOption = document.getElementById("work-option");
workOption.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value < 1 || value > 60) { 
        workOption.value = 25;
    }
})

const workButton = document.getElementById("work-button");  
workButton.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        workOption: workOption.value,
        isRunning: false,
    })
});

const breakOption = document.getElementById("break-option");
breakOption.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value < 1 || value > 60) { 
        breakOption.value = 5;
    }
})

const breakButton = document.getElementById("break-button");  
breakButton.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        breakOption: breakOption.value,
        isRunning: false,
    })
});

chrome.storage.local.get(["workOption", "breakOption"], (result) => {
    workOption.value = result.workOption || 25;
    breakOption.value = result.breakOption || 5;
});