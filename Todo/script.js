const todoName = document.getElementById("todo-name");
const addBtn = document.getElementById("add-btn");
const prioritySelect = document.getElementById("priority-select");
const deadline = document.getElementById("deadline");
const savedTodayTodos = JSON.parse(localStorage.getItem("TodayTodos")) || [];
const savedFutureTodos = JSON.parse(localStorage.getItem("FutureTodos")) || [];
const savedCompletedTodos =
  JSON.parse(localStorage.getItem("CompletedTodos")) || [];
const todaysTodos = [...savedTodayTodos];
const futureTodos = [...savedFutureTodos];
const completedTodos = [...savedCompletedTodos];
//icons tick and delete
const tick = document.getElementById("tick");
const trash = document.getElementById("trash");

//3 todo containers today's, future and completed
const today = document.getElementById("today");
const future = document.getElementById("future");
const completed = document.getElementById("completed");

function isToday(selectedDate) {
  const today = new Date();
  return (
    selectedDate.getFullYear() === today.getFullYear() &&
    selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth()
  );
}

function isFuture(selectedDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate.getTime() > today.getTime();
}

//saparate function to create a todo object

function createATodo(task, taskDate, taskPriority) {
  const todo = {};
  todo.name = task;
  todo.date = `${taskDate.getDate()}/${
    taskDate.getMonth() + 1
  }/${taskDate.getFullYear()}`;
  todo.priority = taskPriority;
  return todo;
}
function getMarkup(todo) {
  return `<div class="todos">
        <p class="todo-name">${todo.name}</p>
        <p class="deadline">${todo.date}</p>
        <p class="priority">Priority: ${todo.priority}</p>
        <div class="icons">
          <span class="material-symbols-outlined effect" class="tick">
            check_circle </span
          ><span class="material-symbols-outlined effect" class="trash">
            delete
          </span>
        </div>
      </div>`;
}
function renderTodos() {
  const TODAY = [...todaysTodos];
  const FUTURE = [...futureTodos];
  if (TODAY) {
    today.innerHTML = "";
    TODAY.forEach((todo) => {
      today.innerHTML += getMarkup(todo);
    });
  }
  if (FUTURE) {
    future.innerHTML = "";
    FUTURE.forEach((todo) => {
      future.innerHTML += getMarkup(todo);
    });
  }
}
addBtn.addEventListener("click", () => {
  const name = todoName.value.trim();
  const date = new Date(deadline.value);
  const priority = prioritySelect.value;
  //which
  if (!name || !date || !priority) alert("Please provide all the inputs!");
  else {
    if (isToday(date)) {
      todaysTodos.push(createATodo(name, date, priority));
      localStorage.setItem("TodayTodos", JSON.stringify(todaysTodos));
      renderTodos();
    } else if (isFuture(date)) {
      futureTodos.push(createATodo(name, date, priority));
      localStorage.setItem("FutureTodos", JSON.stringify(futureTodos));
      renderTodos();
    }
  }
  todoName.value = "";
  deadline.value = "";
  prioritySelect.value = "Priority";
});
renderTodos();
