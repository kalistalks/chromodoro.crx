document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const inputButton = document.getElementById("input-button");

    inputButton.addEventListener("click", addTask);

    function addTask() {
        const task = inputBox.value.trim();
        if (!task) {
            alert("Please enter a task");
            return;
        }
        const li = document.createElement("li");
        li.innerHTML = `
            <label class="me-4">
                <input type="checkbox" class="task-checkbox">
                <span>${task}</span>
            </label>
            <button class="btn edit-button"><img src="images/edit.svg" alt="edit"></button>
            <button class="btn delete-button"><img src="images/trash.svg" alt="delete"></button>`;
        
        listContainer.appendChild(li);
        inputBox.value = "";

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const taskSpan = li.querySelector("span");
        const deleteBtn = li.querySelector(".delete-btn");  
          
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                taskSpan.style.textDecoration = "line-through";
                taskSpan.style.color = "grey";
            }
            else {
                taskSpan.style.textDecoration = "none";
                taskSpan.style.color = "black";
            }
        });
    }  
});
