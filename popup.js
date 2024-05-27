document.addEventListener("DOMContentLoaded", function() {

    const toggleSwitch = document.getElementById("toggle-switch");
    const timer = document.getElementById("timer");

    toggleSwitch.addEventListener("change", function() {
        if (toggleSwitch.checked) {
            timer.innerHTML = "05:00";
        } else {
            timer.innerHTML = "25:00";
        }
    });

    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const inputButton = document.getElementById("input-button");
    const completedCounter = document.getElementById("completed-counter");
    const uncompletedCounter = document.getElementById("uncompleted-counter");

    // Add event listener to the add button
    inputButton.addEventListener("click", () => addTask());

    // Load existing tasks from storage
    loadTasks();   

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
        chrome.storage.local.set({ tasks }, () => updateCounter());   
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
            }
            else {
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
    document.getElementById('start').addEventListener('click', () => {
        // chrome.runtime.sendMessage({ command: 'start' });
        console.log("Start button clicked");
        document.getElementById('reset').disabled = false; // Enable the "Reset" button
    }); 
});