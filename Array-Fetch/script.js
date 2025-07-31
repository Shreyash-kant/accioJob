const btn = document.getElementById("btn");
const outputContainer = document.getElementById("output");
function renderArray(data) {
  if (data.posts) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th colspan="3">Posts</th>`;
    outputContainer.appendChild(tr);
    data.posts.forEach((post) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${post.id}</td><td>${post.title}</td><td>${post.body}</td>`;
      outputContainer.appendChild(tr);
    });
  } else if (data.products) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th colspan="3">Products</th>`;
    outputContainer.appendChild(tr);
    data.products.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${product.id}</td><td>${product.title}</td><td>${product.description}</td>`;
      outputContainer.appendChild(tr);
    });
  } else if (data.todos) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th colspan="3">Todos</th>`;
    outputContainer.appendChild(tr);
    data.todos.forEach((todo) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${todo.id}</td><td>${todo.todo}</td><td>${todo.completed}</td>`;
      outputContainer.appendChild(tr);
    });
  }
  //   console.log(data);
}
function promiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((data) => {
          renderArray(data);
          resolve(data);
        })
        .catch((err) => reject(err));
    }, 1000);
  });
}
function promiseAPI2(prevData) {
  if (!prevData) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          renderArray(data);
          resolve(data);
        })
        .catch((err) => reject(err));
    }, 2000);
  });
}
function promiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          renderArray(data);
          resolve(data);
        })
        .catch((err) => reject(err));
    }, 3000);
  });
}
btn.addEventListener("click", () => {
  outputContainer.innerHTML = "";
  promiseAPI1()
    .then((data1) => promiseAPI2(data1))
    .then((data2) => promiseAPI3(data2))
    .catch((err) => console.log(err));
});
