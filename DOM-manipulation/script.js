const value = document.querySelector("#value");
const increment = document.querySelector(".increment");
const decrement = document.querySelector(".decrement");
const clear = document.querySelector(".clear");
const errorMessage = document.querySelector(".error-message");

let count = 1;
function incrementHandler() {
  count++;
  value.textContent = count;
  if (count > 0 && decrement.disabled === true) {
    decrement.disabled = false;
    clear.style.display = "inline";
    errorMessage.textContent = "";
  }
}
function decrementHandler() {
  count--;
  value.textContent = count;
  if (count === 0) {
    errorMessage.textContent = "Error: Cannot go below 0";
    decrement.disabled = true;
    clear.style.display = "none";
  }
}
function clearHandler() {
  count = 0;
  value.textContent = count;
  decrement.disabled = true;
  clear.style.display = "none";
  errorMessage.textContent = "Error: Cannot go below 0";
}
increment.addEventListener("click", incrementHandler);
decrement.addEventListener("click", decrementHandler);
clear.addEventListener("click", clearHandler);
