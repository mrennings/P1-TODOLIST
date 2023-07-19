// Neue Aufgabe
function addTask() {
    const taskInput = document.getElementById('input-task');
    const taskValue = taskInput.value.trim();

    if ( !isTextValid(taskValue)) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = 'Was willst du erledigen?';
        errorDiv.style.display = 'block';
        return;
    }

    taskInput.value = '';
    // hideError();

    const newTask = {
        "todo": taskValue,
        "prio": "B",
        "due": "",
        "created": Date.now(),
        "start": "",
        "done": "",
        "isDone": false,
        "context": "@None",
        "project": "+None"
    };

    todos.push(newTask);

    writeStorage(todos);
    createTodoLI();
}

// EventListener
const addTaskButton = document.getElementById("add-task");
addTaskButton.addEventListener("click", addTask);


