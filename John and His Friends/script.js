let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

function PrintDeveloperbyMap() {
  //Write your code here , just console.log
  arr.map((obj) => {
    if (obj.profession === "developer")
      console.log(
        `id: ${obj.id}, name: ${obj.name}, age: ${obj.age}, profession: ${obj.profession}`
      );
  });
}

function PrintDeveloperbyForEach() {
  //Write your code here , just console.log
  arr.forEach((obj) => {
    if (obj.profession === "developer")
      console.log(
        `id: ${obj.id}, name: ${obj.name}, age: ${obj.age}, profession: ${obj.profession}`
      );
  });
}

function addData() {
  //Write your code here, just console.log
  const obj = { id: 4, name: "susan", age: "20", profession: "intern" };
  arr.push(obj);
  arr.forEach((obj) => {
    console.log(
      `id: ${obj.id}, name: ${obj.name}, age: ${obj.age}, profession: ${obj.profession}`
    );
  });
}

function removeAdmin() {
  //Write your code here, just console.log
  arr = arr.filter((obj) => obj.profession !== "admin");
  arr.forEach((obj) => {
    console.log(
      `id: ${obj.id}, name: ${obj.name}, age: ${obj.age}, profession: ${obj.profession}`
    );
  });
}

function concatenateArray() {
  //Write your code here, just console.log
  const addArr = [
    { id: 1, name: "stewert", age: "18", profession: "developer" },
    { id: 2, name: "sam", age: "20", profession: "network engineer" },
    { id: 3, name: "demian", age: "30", profession: "cyber security engineer" },
  ];
  arr = arr.concat(addArr);
  arr.forEach((obj) => {
    console.log(
      `id: ${obj.id}, name: ${obj.name}, age: ${obj.age}, profession: ${obj.profession}`
    );
  });
}
