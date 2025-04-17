const arr = [];
let numberOfUsers = 0;
const userName = document.getElementById("name");
const profession = document.getElementById("profession");
const age = document.getElementById("age");
const userForm = document.getElementById("userForm");
const errorMessage = document.getElementsByClassName("errorMessage")[0];
const employeesListContainer = document.getElementsByClassName("employees")[0];
const statusElement = document.getElementsByClassName("status")[0];
function checkData(a, b, c) {
  if (!a || !b || isNaN(c)) return false;
  return true;
}
function renderUsers(obj) {
  arr.push(obj);
  const employee = document.createElement("div");
  employee.className = "employee";
  const empdata = document.createElement("div");
  empdata.className = "empdata";
  empdata.innerHTML = `<span>${obj.id}.</span><span>${obj.userName}</span><span>${obj.profession}</span><span>${obj.age}</span>`;
  employee.appendChild(empdata);
  const btn = document.createElement("button");
  btn.textContent = "Delete User";
  employee.appendChild(btn);
  employee.setAttribute("id", `employee-${obj.id}`);
  employeesListContainer.appendChild(employee);
}
function getData(e) {
  e.preventDefault();
  const a = userName.value.trim();
  const b = profession.value.trim();
  const c = parseInt(age.value.trim(), 10);
  if (!checkData(a, b, c)) {
    errorMessage.textContent =
      "Error: Please Make sure All the fields are filled before adding in an employee !";
    errorMessage.style.display = "block";
    errorMessage.style.color = "red";
  } else {
    renderUsers({ id: ++numberOfUsers, userName: a, profession: b, age: c });
    errorMessage.textContent = "Success: Employee Added!";
    errorMessage.style.display = "block";
    errorMessage.style.color = "green";
    setTimeout(() => (errorMessage.style.display = "none"), 2000);
  }
  statusElement.style.display = arr.length === 0 ? "block" : "none";
  userName.value = "";
  profession.value = "";
  age.value = "";
  userName.focus();
}
function removeUser(e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Delete User") {
    const parent = e.target.parentElement;
    const idToDelete = parseInt(parent.id.split("-")[1], 10);
    let indexOfElementToDelete = arr.findIndex((obj) => obj.id === idToDelete);
    arr.splice(indexOfElementToDelete, 1);
    parent.remove();
  }
  if (arr.length === 0)
    setTimeout(() => (statusElement.style.display = "block"), 1000);
}
userForm.addEventListener("submit", getData);
employeesListContainer.addEventListener("click", removeUser);
