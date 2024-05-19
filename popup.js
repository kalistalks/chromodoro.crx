const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please enter a task");
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `<label>
    <input type="checkbox">
    <span>${task}</span>
    </label>
    <span class="edit-btn"><img src="images/edit.png" alt="edit"></span>
    <span class="delete-btn"><img src="images/trash.png" alt="delete"></span>`;
    listContainer.appendChild(li);
}