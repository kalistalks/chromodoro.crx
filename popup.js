document.addEventListener("DOMContentLoaded", function() {

    const toggleSwitch = document.getElementById("toggle-switch");
    const timerDisplay = document.getElementById("time");
    const progressBar = document.querySelector(".progress-bar");

    function updateTimerDisplay() {
        chrome.storage.local.get(["workOption", "breakOption", "toggleSwitch"], (data) => {
            const value = data.toggleSwitch ? data.breakOption : data.workOption;
            timerDisplay.innerHTML = `${value < 10 ? "0" + value : value}:00`;
        });
    }

    function updateToggleSwitchState() {
        chrome.storage.local.get("toggleSwitch", (data) => {
            toggleSwitch.checked = data.toggleSwitch || false;
        });
    }
    
    updateTimerDisplay();
    updateToggleSwitchState();

    toggleSwitch.addEventListener("change", function() {
        chrome.storage.local.get(["workOption", "breakOption"], (data) => {
            if (toggleSwitch.checked) {
                timerDisplay.innerHTML = `${data.breakOption < 10 ? "0" + data.breakOption : data.breakOption}:00`;
                chrome.storage.local.set({toggleSwitch: true});
            }
            else {
                timerDisplay.innerHTML = `${data.workOption < 10 ? "0" + data.workOption : data.workOption}:00`;
                chrome.storage.local.set({toggleSwitch: false});
            }
        });
    });

    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const inputButton = document.getElementById("input-button");
    const completedCounter = document.getElementById("completed-counter");
    const uncompletedCounter = document.getElementById("uncompleted-counter");

    inputButton.addEventListener("click", () => addTask());

    function loadTasks() {
        chrome.storage.local.get("tasks", data => {
            if (data.tasks) {
                data.tasks.forEach(task => {
                    addTask(task.text, task.completed, task.textDecoration, task.color, false);
                });
                updateCounter();
            }
        });
    }

    loadTasks();

    function updateCounter() {
        const completedTasks = listContainer.querySelectorAll("li.completed").length;
        const uncompletedTasks = listContainer.querySelectorAll("li:not(.completed)").length;
        completedCounter.textContent = completedTasks;
        uncompletedCounter.textContent = uncompletedTasks;
    }

    function saveTasks() {
        const tasks = [];
        listContainer.querySelectorAll("li").forEach(li => {
            const task = {
                text: li.querySelector("span").textContent,
                completed: li.querySelector("input").checked,
                textDecoration: li.querySelector("span").style.textDecoration,
                color: li.querySelector("span").style.color
            };
            tasks.push(task);
        });
        chrome.storage.local.set({tasks}, () => updateCounter());
    }

    function addTask(text, completed = false, textDecoration = "none", color = "black", isNew = true) {
        const taskText = text || inputBox.value.trim();
        if (!taskText) {
            alert("Please enter a task");
            return;
        }
        const li = document.createElement("li");
        li.innerHTML = `<div class="form-check custom-checkbox">
            <label class="form-check-label me-4">
                <input type="checkbox" class="form-check-input">
                <span style="text-decoration: ${textDecoration}; color: ${color}">${taskText}</span>
            </label>
            <button class="btn edit-button"><img src="images/edit.svg" alt="edit"></button>
            <button class="btn delete-button"><img src="images/trash.svg" alt="delete"></button>
        </div>`;

        listContainer.appendChild(li);
        if (isNew) inputBox.value = "";
        updateCounter();

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-button");
        const taskSpan = li.querySelector("span");
        const deleteBtn = li.querySelector(".delete-button");

        checkbox.checked = completed;
        li.classList.toggle("completed", checkbox.checked);

        checkbox.addEventListener("change", function() {
            li.classList.toggle("completed", checkbox.checked);
            if (checkbox.checked) {
                taskSpan.style.textDecoration = "line-through";
                taskSpan.style.color = "grey";
            } else {
                taskSpan.style.textDecoration = "none";
                taskSpan.style.color = "black";
            }
            saveTasks();
            updateCounter();
        });

        editBtn.addEventListener("click", function() {
            const update = prompt("Enter new task", taskText);
            if (update) {
                taskSpan.textContent = update;
                taskSpan.style.textDecoration = "none";
                taskSpan.style.color = "black";
                checkbox.checked = false;
                li.classList.remove("completed");
                saveTasks();
            }
        });

        deleteBtn.addEventListener("click", function() {
            if (confirm("Are you sure you want to delete this task?")) {
                li.remove();
                saveTasks();
                updateCounter();
            }
        });

        if (isNew) saveTasks();
    }

    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");

    startButton.addEventListener("click", () => {
        chrome.storage.local.set({isRunning: true});
    });

    stopButton.addEventListener("click", () => {
        chrome.storage.local.set({isRunning: false});
    });

    resetButton.addEventListener("click", () => {
        chrome.storage.local.set({timer: 0, isRunning: false});
        chrome.storage.local.get(["workOption", "breakOption"], data => {
            timerDisplay.innerHTML = toggleSwitch.checked ? `${data.breakOption < 10 ? "0" + data.breakOption : data.breakOption}:00` : `${data.workOption < 10 ? "0" + data.workOption : data.workOption}:00`;
        })
        progressBar.style.width = "0%"; 
        progressBar.textContent = "0%";
    });

    function updateTime() {
        chrome.storage.local.get(["timer", "isRunning", "workOption", "breakOption", "toggleSwitch"], data => {
            if (data.isRunning){
                value = data.toggleSwitch ? data.breakOption : data.workOption;
                const minutes = value - Math.ceil(data.timer / 60); 
                let seconds = 0;
                if (data.timer % 60 === 0) {
                    seconds = 0;
                } else {
                    seconds = 60 - Math.ceil(data.timer % 60);
                }
                timerDisplay.textContent = `${minutes < 10 ? "0"+ minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
                const percentage = (data.timer / (value * 60)) * 100;
                progressBar.style.width = `${percentage}%`;
                progressBar.textContent = `${Math.round(percentage)}%`;
            }
        });
    }

    updateTime();
    setInterval(updateTime, 1000);
});