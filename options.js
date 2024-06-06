const workOption = document.getElementById("work-option");
workOption.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value < 1 || value > 60) { 
        workOption.value = 25;
    }
})

const workButton = document.getElementById("work-button");  
workButton.addEventListener("click", () => {
    chrome.local.storage.set({
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
workButton.addEventListener("click", () => {
    chrome.local.storage.set({
        timer: 0,
        breakOption: breakOption.value,
        isRunning: false,
    })
});

chrome.storage.local.get()