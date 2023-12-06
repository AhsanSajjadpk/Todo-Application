let pendingtasks = []
let completedtasks = []
const taskInput = document.getElementById('add')

// add task
function addTask() {
    const taskText = taskInput.value.trim()
    // console.log(taskText)
    if (taskText !== "") {
        pendingtasks.push(taskText)
        renderPendingTasks();

        taskInput.value = " "
        taskInput.focus()

    }
    else {
        alert("Add Your Task")
        taskInput.focus()
    }

}


// Render Pending Task
function renderPendingTasks() {
    const pendingList = document.getElementById('pendinglist');
    const existingTasks = pendingList.querySelectorAll('li')

    existingTasks.forEach(task => task.remove())
    for (let i = 0; i < pendingtasks.length; i++) {
        const taskText = pendingtasks[i]
        const newTask = document.createElement('span')
        newTask.innerHTML = `
        <li>${taskText}
        
        <div>
        
        <i class="fa-solid fa-check" onclick = "completeTask(${i})"></i>
        <i class="fa-solid fa-pen-to-square" onclick = "editTask(${i})"></i>
        <i class="fa-solid fa-trash"  onclick = "deleteTask('pending',${i})"></i>
        
        </div>
        
        </li>
        `
        pendingList.appendChild(newTask)


    }
}


function editTask(index) {
    const originalTask = pendingtasks[index]; // Store the original task

    const taskText = prompt('Edit the Task ', pendingtasks[index]);

    if (taskText !== null) { // Check if prompt was canceled
        if (taskText !== "") {
            pendingtasks[index] = taskText;
            renderPendingTasks();

        } else {
            alert("Task cannot be empty!");
        }
    } else {
        // Restore the original value if prompt was canceled
        pendingtasks[index] = originalTask;
    }
}


function completeTask(index) {
    const taskText = pendingtasks[index];
    pendingtasks.splice(index, 1)
    completedtasks.push(taskText)
    renderPendingTasks()
    renderCompletedTasks()


}
function deleteTask(listType, index) {
    if (listType == 'pending') {
        pendingtasks.splice(index, 1)
        renderPendingTasks()
    }
    else if (listType == 'complete')
        completedtasks.splice(index, 1)
    renderCompletedTasks()

}

// Render Completed tasks

function renderCompletedTasks() {
    const completeList = document.getElementById('completelist');
    const completeTasks = completeList.querySelectorAll('li')

    completeTasks.forEach(task => task.remove())
    for (let i = 0; i < completedtasks.length; i++) {
        const taskText = completedtasks[i]
        const newTask = document.createElement('span')
        newTask.innerHTML = `
        <li>${taskText}
        
        <div>
       
        <i class="fa-solid fa-trash"  onclick = "deleteTask('complete',${i})"></i>
        </div>
        
        </li>
        `
        completeList.appendChild(newTask)


    }
}


let btn = document.getElementById('btn')
let add = document.getElementById('add')
btn.addEventListener('click', addTask)

add.addEventListener('keyup', (event) => {

    if (event.key === 'Enter') {
        addTask()
    }
})