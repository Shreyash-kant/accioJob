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
function getMarkup(todo, index, isCompleted = false) {
  return `<div class="todos ${
    isCompleted ? "completed" : ""
  }" data-index="${index}">
        <p class="todo-name">${todo.name}</p>
        <p class="deadline">${todo.date}</p>
        <p class="priority">Priority:${todo.priority}</p>
        <div class="icons">
          <span class="material-symbols-outlined effect tick">check_circle</span
          ><span class="material-symbols-outlined effect trash">delete</span>
        </div>
      </div>`;
}
function renderTodos(
  renderToday = true,
  renderFuture = true,
  renderCompletd = true
) {
  const TODAY = [...todaysTodos];
  const FUTURE = [...futureTodos];
  const COMPLETED = [...completedTodos];
  if (TODAY && renderToday) {
    today.innerHTML = "";
    TODAY.forEach((todo, index) => {
      today.innerHTML += getMarkup(todo, index);
    });
  }
  if (FUTURE && renderFuture) {
    future.innerHTML = "";
    FUTURE.forEach((todo, index) => {
      future.innerHTML += getMarkup(todo, index);
    });
  }
  if (COMPLETED && renderCompletd) {
    completed.innerHTML = "";
    COMPLETED.forEach((todo, index) => {
      completed.innerHTML += getMarkup(todo, index, true);
    });
  }
}
addBtn.addEventListener("click", () => {
  const name = todoName.value.trim();
  const date = new Date(deadline.value);
  const priority = prioritySelect.value;

  if (!name || isNaN(date.getTime()) || !priority)
    alert("Please provide all the inputs!");
  else {
    if (isToday(date)) {
      todaysTodos.push(createATodo(name, date, priority));
      localStorage.setItem("TodayTodos", JSON.stringify(todaysTodos));
      renderTodos(true, false, false);
    } else if (isFuture(date)) {
      futureTodos.push(createATodo(name, date, priority));
      localStorage.setItem("FutureTodos", JSON.stringify(futureTodos));
      renderTodos(false, true, false);
    }
  }
  todoName.value = "";
  deadline.value = "";
  prioritySelect.selectedIndex = 0;
});
//todo transfer to completed seciton
[today, future, completed].forEach((section) => {
  section.addEventListener("click", (event) => {
    const element = event.target;
    const todoContainer = element.closest(".todos");
    const index = todoContainer.dataset.index;
    const sectionName = event.currentTarget.id;
    if (element.tagName === "SPAN" && element.textContent === "check_circle") {
      if (sectionName === "today") {
        const todoObject = todaysTodos.splice(index, 1)[0];
        completedTodos.push(todoObject);
        localStorage.setItem("TodayTodos", JSON.stringify(todaysTodos));
        localStorage.setItem("CompletedTodos", JSON.stringify(completedTodos));
        renderTodos(true, false, true);
      } else if (sectionName === "future") {
        const todoObject = futureTodos.splice(index, 1)[0];
        completedTodos.push(todoObject);
        localStorage.setItem("FutureTodos", JSON.stringify(futureTodos));
        localStorage.setItem("CompletedTodos", JSON.stringify(completedTodos));
        renderTodos(false, true, true);
      }
    } else if (element.tagName === "SPAN" && element.textContent === "delete") {
      if (sectionName === "today") {
        todaysTodos.splice(index, 1);
        localStorage.setItem("TodayTodos", JSON.stringify(todaysTodos));
        renderTodos(true, false, false);
      } else if (sectionName === "future") {
        futureTodos.splice(index, 1);
        localStorage.setItem("FutureTodos", JSON.stringify(futureTodos));
        renderTodos(false, true, false);
      } else if (sectionName === "completed") {
        completedTodos.splice(index, 1);
        localStorage.setItem("CompletedTodos", JSON.stringify(completedTodos));
        renderTodos(false, false, true);
      }
    }
  });
});
renderTodos();
