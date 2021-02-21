const products = [
  { id: 1, title: "Notebook", price: 20000 },
  { id: 2, title: "Mouse", price: 1500 },
  { id: 3, title: "Keyboard", price: 5000 },
  { id: 4, title: "Gamepad", price: 4500 },
];

const renderProduct = (product) => {
  const {
    title,
    price,
    img = "https://www.tibs.org.tw/images/default.jpg",
  } = product;
  return `<div class="product-item">
                <img class="defaultImage" src="${img}" />
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (productsArray) => {
  productsArray.forEach((product) => {
    document
      .querySelector(".products")
      .insertAdjacentHTML("beforeend", renderProduct(product));
  });
};

renderProducts(products);

// const renderProduct = (title, price) => {
//   return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// };

// const renderProducts = (list) => {
//   const productList = list.map((item) => {
//     return renderProduct(item.title, item.price);
//   });

//   console.log(productList);
//   document.querySelector(".products").innerHTML = productList;
// };
