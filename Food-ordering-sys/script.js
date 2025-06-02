const menuItemsContainer = document.getElementById("dynamic-content");
function getData() {
  return fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  ).then((data) => {
    if (!data.ok) throw new Error("something went wrong");
    return data.json();
  });
}
function renderMenu(data) {
  menuItemsContainer.innerHTML = "";
  data.forEach((item) => {
    menuItemsContainer.innerHTML += `<div class="card">
                    <div class="image-card">
                    <img src=${item.imgSrc} alt="" />
                    </div>
                    <div class="info-card">
                    <p class="product-name">${item.name}</p>
                    <div class="product">
                        <p class="product-price">$${item.price}/-</p>
                        <button>+</button>
                    </div>
                    </div>
                </div>`;
  });
}
getData()
  .then((data) => {
    console.log(data);
    renderMenu(data);
  })
  .catch((error) => {
    console.log(error.message, error);
  });
function takeOrder() {
  const burgers = [
    { name: "Cheese Burger", price: 5.99 },
    { name: "Veggie Burger", price: 6.49 },
    { name: "Bacon Burger", price: 7.49 },
    { name: "Chicken Burger", price: 6.99 },
    { name: "Mushroom Burger", price: 6.79 },
    { name: "Double Cheese Burger", price: 8.99 },
    { name: "BBQ Burger", price: 7.99 },
    { name: "Fish Burger", price: 7.29 },
    { name: "Turkey Burger", price: 6.49 },
    { name: "Spicy Burger", price: 7.49 },
  ];
  return new Promise((resolve) => {
    const order = [];
    setTimeout(() => {
      for (let i = 0; i < 3; ++i) {
        let randomeNum = Math.floor(Math.random() * burgers.length);
        order.push(burgers[randomeNum]);
      }
      console.log("you order: ", order);
      resolve(order);
    }, 2500);
  });
}
function prepareOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderStatus = { order_status: true, amountPaid: false };
      console.log("order prepared: ", orderStatus);
      resolve(orderStatus);
    }, 1500);
  });
}
function payBill(preparedOrder) {
  return new Promise((resolve) => {
    setTimeout(() => {
      preparedOrder.amountPaid = true;
      console.log("billing status:", preparedOrder);
      resolve();
    }, 1000);
  });
}
function thankyouFnc() {
  alert("thank you for ordering!");
}
takeOrder()
  .then(prepareOrder)
  .then((preparedOrder) => {
    return payBill(preparedOrder);
  })
  .then(() => {
    thankyouFnc();
  })
  .catch((error) => console.log(error.message));
