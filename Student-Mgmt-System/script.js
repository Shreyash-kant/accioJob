let students = [];

const tbody = document.getElementById("table-body");
const searchBar = document.getElementById("search-bar");
const sortAZ = document.getElementById("sortAZ");
const sortZA = document.getElementById("sortZA");
const sortMarks = document.getElementById("sortMarks");
const sortPass = document.getElementById("sortPass");
const sortClass = document.getElementById("sortClass");
const sortGender = document.getElementById("sortGender");
const femaleTBody = document.getElementById("female-table-body");
const maleTBody = document.getElementById("male-table-body");
const maleStudentList = document.getElementById("males");
const femaleStudentList = document.getElementById("females");

function showElement(element) {
  element.style.display = "block";
}
function resetView() {
  // Hides male/female tables only
  // Main table (`tbody`) stays visible to show "Other" gender students
  maleStudentList.style.display = "none";
  femaleStudentList.style.display = "none";
  maleTBody.innerHTML = "";
  femaleTBody.innerHTML = "";
}

function renderStudents(students, targetBody = tbody) {
  targetBody.innerHTML = "";
  students.forEach((student) => {
    const trow = document.createElement("tr");
    trow.innerHTML = `
      <td>${student.id}</td>
      <td>
        <img src="${student.img_src}" alt="${
      student.first_name
    }" width="30" height="30" style="border-radius:50%; vertical-align:middle; margin-right:8px;" />
        ${student.first_name} ${student.last_name}
      </td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    targetBody.appendChild(trow);
  });
}

async function fetchStudents() {
  try {
    const data = await fetch(
      "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
    );

    if (!data.ok) throw new Error("Error status:" + data.status);
    students = await data.json();
    renderStudents(students);
  } catch (error) {
    console.log("Error: " + error.status || error);
  }
}

// on input students will be shown dynamically
function filterStudents() {
  resetView();
  const query = searchBar.value.trim().toLowerCase();
  const filteredStudent = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    return (
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      fullName.includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });
  renderStudents(filteredStudent);
}

function sortAscending() {
  resetView();
  const sortedStudents = [...students].sort((A, B) => {
    const fullNameA = `${A.first_name} ${A.last_name}`;
    const fullNameB = `${B.first_name} ${B.last_name}`;
    return fullNameA.localeCompare(fullNameB, "en", { sensitivity: "base" });
  });
  renderStudents(sortedStudents);
}

function sortDescending() {
  resetView();
  const sortedStudents = [...students].sort((A, B) => {
    const fullNameA = `${A.first_name} ${A.last_name}`;
    const fullNameB = `${B.first_name} ${B.last_name}`;
    return fullNameB.localeCompare(fullNameA, "en", { sensitivity: "base" });
  });
  renderStudents(sortedStudents);
}

function sortByMarks() {
  resetView();
  const sortedStudents = [...students].sort((studentA, studentB) => {
    return studentA.marks - studentB.marks;
  });
  renderStudents(sortedStudents);
}

function sortByClass() {
  resetView();
  const sortedStudents = [...students].sort((studentA, studentB) => {
    return studentA.class - studentB.class;
  });
  renderStudents(sortedStudents);
}

function filterPassedStudents() {
  resetView();
  const sortedStudents = students.filter((student) => student.passing === true);
  renderStudents(sortedStudents);
}

function sortByGender() {
  // sort females
  const females = students.filter((student) => student.gender === "Female");
  //sort males
  const males = students.filter((student) => student.gender === "Male");
  //sort others
  const others = students.filter(
    (student) => student.gender !== "Male" && student.gender !== "Female"
  );
  renderStudents(females, femaleTBody);
  renderStudents(males, maleTBody);
  renderStudents(others);
  showElement(maleStudentList);
  showElement(femaleStudentList);
}
let debounce;
searchBar.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(filterStudents, 400);
});
sortAZ.addEventListener("click", sortAscending);
sortZA.addEventListener("click", sortDescending);
sortMarks.addEventListener("click", sortByMarks);
sortClass.addEventListener("click", sortByClass);
sortPass.addEventListener("click", filterPassedStudents);
sortGender.addEventListener("click", sortByGender);
///initially resetView function is called to hide male and female students
//containers as they should be visible only when gender based sorting is needed
//every sorting function will reset the view before performing any operation on the data
// because applying gender based
//sorting for once the page will have markup for males and females visible
// and to show the result of other operations you have to reset the ui
resetView();
fetchStudents();
