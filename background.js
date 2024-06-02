chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60, 
})

chrome.alarm.onAlarm.addListener((alarm) => {
  if (alarm.name == "pomodoroTimer") { 
    chrome.storage.local.get(["timer", "isRunning"], (result) => {
      if (result.isRunning) {
        let timer = result.timer + 1
        chrome.storage.local.set({timer: timer}) 
      }
  })
  }
})

chrome.storage.local.get(["timer", "isRunning"], (result) => {
  chrome.storage.local.set({
    timer: "timer" in result ? result.timer : 0,
    isRunning : "isRunning" in result ? result.isRunning : false 
  })
})

let countdown;
let time = 25 * 60;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "start") {
        console.log("start button has been pressed");
        startTimer();
      }
      else if (request.message === "stop") {
        console.log("stop button has been pressed");
        restartTimer();
      }
      else if (request.message == "stop") { 
        console.log("stop button has been pressed");
        stopTimer();
      }
    }
  );

  function startTimer() {

  }

  function restartTimer() {

  } 

  function stopTimer() {
    
  }