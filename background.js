/*
background.js

Handles the initial setup and configuration for the Pomodoro Timer Chrome extension.
This script primarily deals with setting default values and handling user interactions 
on the options page for work and break durations.
*/

chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60, 
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name == "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "workOption", "breakOption", "toggleSwitch"], (result) => {
      if (result.isRunning) {
        const value = result.toggleSwitch ? result.breakOption : result.workOption;
        let timer = result.timer + 1;
        let isRunning = true;
        if (timer >= value * 60) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `Time's up! ${value} minutes have passed!`,
            icon: "images/favicon-32x32.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({timer: timer, isRunning: isRunning});
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "workOption", "breakOption", "toggleSwitch"], (result) => {
  chrome.storage.local.set({
    timer: "timer" in result ? result.timer : 0,
    isRunning : "isRunning" in result ? result.isRunning : false,
    workOption: "workOption" in result ? result.workOption : 25,
    breakOption: "breakOption" in result ? result.breakOption : 5,
    toggleSwitch : "toggleSwitch" in result ? result.toggleSwitch : false,
  })
})