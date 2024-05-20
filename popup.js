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
    }
});
