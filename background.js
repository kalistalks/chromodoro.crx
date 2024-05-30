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