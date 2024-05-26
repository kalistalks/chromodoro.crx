document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const inputButton = document.getElementById("input-button");
    const completedCounter = document.getElementById("completed-counter");
    const uncompletedCounter = document.getElementById("uncompleted-counter");

    inputButton.addEventListener("click", () => addTask());
    loadTasks();   

    function loadTasks() { 
        chrome.storage.local.get("tasks", data => {
            if (data.tasks) {
                data.tasks.forEach(task => {
                    addTask(task.text, task.completed);
                })
            }
        });
    }

    function updateCounter() {
        const completedTasks = document.querySelectorAll("li.completed").length;
        const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
        completedCounter.textContent = completedTasks;
        uncompletedCounter.textContent = uncompletedTasks;
    }

    function saveTasks() { 
        const tasks = [];
        listContainer.querySelectorAll("li").forEach(li => {
            const task = {
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed")
        };
            tasks.push(task);
        });
        chrome.storage.local.set({tasks}, () => updateCounter());   
    }

    function addTask(task, completed=false) {
        task = task || inputBox.value.trim();
        if (!task) {
            alert("Please enter a task");
            return;
        }
        const li = document.createElement("li");
        li.innerHTML = `
            <label class="me-4">
                <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}>
                <span>${task}</span>
            </label>
            <button class="btn edit-button"><img src="images/edit.svg" alt="edit"></button>
            <button class="btn delete-button"><img src="images/trash.svg" alt="delete"></button>`;
        
        listContainer.appendChild(li);
        inputBox.value = "";
        updateCounter();
        saveTasks();   

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-button");
        const taskSpan = li.querySelector("span");
        const deleteBtn = li.querySelector(".delete-button");  
          
        checkbox.addEventListener("click", function () {
            li.classList.toggle("completed", checkbox.checked);
            if (checkbox.checked) {
                taskSpan.style.textDecoration = "line-through";
                taskSpan.style.color = "grey";  
            }
            else {
                taskSpan.style.textDecoration = "none";
                taskSpan.style.color = "black";
            }
            updateCounter();
            saveTasks();
        });
        
        editBtn.addEventListener("click", function () {
            const update = prompt("Enter new task", task);
            if (update) { 
                taskSpan.textContent = update;
                taskSpan.style.textDecoration = "none";
                taskSpan.style.color = "black";
                checkbox.checked = false;
                li.classList.remove("completed");
                updateCounter();
                saveTasks();
            }
        });

        deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this task?")) {
                li.remove();
                updateCounter();
                saveTasks();
            }
            
        });
    }
});