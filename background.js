chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60, 
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name == "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "initialTimerValue"], (result) => {
      if (result.isRunning) {
        let timer = result.timer + 1;
        let isRunning = true;
        if (timer >= result.initialTimerValue * 60) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `Time's up! ${result.initialTimerValue} minutes have passed!`,
            icon: "images/favicon-32x32.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({ timer: timer, isRunning: isRunning });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning"], (result) => {
  chrome.storage.local.set({
    timer: "timer" in result ? result.timer : 0,
    isRunning : "isRunning" in result ? result.isRunning : false  // ternery operator
  })
})