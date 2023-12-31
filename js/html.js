const tasklist = document.getElementById("tasks");
const selFilter = document.getElementById("filter");
const dreiTage = 1000 * 60 * 60 * 24 * 3;
const fuenfTage = 1000 * 60 * 60 * 24 * 5;

function createTodoLI() {
    /*
     * Erstellt das html für die ToDo-Liste; wertet das Filter-Select (Dropdown) aus
    */

    let arr = [];
    switch (selFilter.value) {
        case "open":
            arr = todos.filter(elem => elem.isDone == false);
            break;
        case "done":
            arr = todos.filter(elem => elem.isDone == true);
            break;
        default:
            // Sortierung: offene Tasks oberhalb der erledigten
            arr = todos.filter(elem => elem.isDone == false)
                    .concat(todos.filter(elem => elem.isDone == true));
    };

    tasklist.innerHTML = "";
    arr.forEach((todo) => {
        const li = document.createElement("li");
        li.className = todo.isDone ? "task completed" : "task";
        
        // ! Container-Div
        const containerDiv = li.appendChild(document.createElement("div"));
        containerDiv.classList.add("task-container");
            // ! div: Done
        const doneDiv = containerDiv.appendChild(document.createElement("div"));
        doneDiv.classList.add("chkbox");
        const doneBox = doneDiv.appendChild(document.createElement("input"));
        doneBox.setAttribute("type", "checkbox");
        doneBox.checked = todo["isDone"] ? true : false;
        doneBox.addEventListener("change", () => markTaskDone(doneBox, todo.created));

            // ! div: ToDo-Text
        const textDiv = containerDiv.appendChild(document.createElement("div"));
        textDiv.classList.add("aufgabe");
        const textTask = textDiv.appendChild(document.createTextNode(todo["todo"]));
        
            // ! div: Actions (Delete, Edit, Date Created, …)
        const actionsDiv = containerDiv.appendChild(document.createElement("div"));
        actionsDiv.classList.add("items")
        
        const btnEdit = actionsDiv.appendChild(document.createElement("i"));
        btnEdit.classList.add("fa", "fa-pencil");
        btnEdit.addEventListener("click", () => openModal(todo.created));

        const btnDel = actionsDiv.appendChild(document.createElement("i"));
        btnDel.classList.add("fa", "fa-trash");
        btnDel.addEventListener("click", () => delTask(todo.created));
        
            // ! Datum
        const dateDiv = containerDiv.appendChild(document.createElement("div"));
        dateDiv.classList.add("dates");
        const textSpan = dateDiv.appendChild(document.createElement("span"));
        textSpan.innerHTML = new Date(todo.created).toLocaleDateString() + " → ";
        if ( !todo.isDone) {
            const inputDue = textSpan.appendChild(document.createElement("input"));
            inputDue.setAttribute("type", "date");
            inputDue.id = todo.created;
            inputDue.min = new Date().toISOString().replace(/T.*$/, "");
            inputDue.classList.add("date-input");
            if (todo.due) {
                inputDue.value = new Date(todo.due).toISOString().replace(/T.*$/, "");
                if (todo.due - dreiTage < Date.now()) {
                    inputDue.classList.add("dreiTage");
                } else if (todo.due - fuenfTage < Date.now()) {
                    inputDue.classList.add("fuenfTage");
                }
            }
            inputDue.addEventListener("change", (e) => {
                setDueDate(e);
            });
            textSpan.classList.add("date-created");
        } else {
            if (todo.due) {
                textSpan.innerHTML += new Date(todo.due).toLocaleDateString();
            }
        }
        // ! ENDE: Container-Div

        tasklist.appendChild(li);
    });
};

// * Wenn Filterbedingung geändert wird, reagieren
selFilter.addEventListener("change", createTodoLI);

// * Initial rendern
createTodoLI();
