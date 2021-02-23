class ProductList {
  #goods;
  #allProducts;

  constructor(container = ".products") {
    console.log("constructor");
    this.container = container;
    // this._goods = [];
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods();
    this.#render();
  }
  // Task 2 / HW2
  // REDUCE VARIANT - very hard complicated
  getTotalProductsPrice() {
    return this.#goods.reduce((accum, item) => {
      return accum + item.price;
    }, 0);
  }

  // FOREACH VARIANT
  // getTotalProductsPrice() {
  //   let totalPrice = 0;
  //   this.#goods.forEach((item) => {
  //     totalPrice += item.price;
  //   });
  //   return totalPrice;
  // }

  #fetchGoods() {
    this.#goods = [
      { id: 1, title: "Notebook", price: 20000 },
      { id: 2, title: "Mouse", price: 1500 },
      { id: 3, title: "Keyboard", price: 5000 },
      { id: 4, title: "Gamepad", price: 4500 },
    ];
  }

  #render() {
    const block = document.querySelector(this.container);

    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML("beforeend", productObject.render());
    });
  }
}

class ProductItem {
  constructor(product, img = "https://placehold.it/200x150") {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();

// Task 1 / HW2
class CartList {
  constructor() {}
  addItem() {}
  removeItem() {}
  getCartTotalPrice() {}
  render() {}
}

class CartItem {
  constructor() {}
  render() {}
}

// MY CODE HW1

// const products = [
//   { id: 1, title: "Notebook", price: 20000 },
//   { id: 2, title: "Mouse", price: 1500 },
//   { id: 3, title: "Keyboard", price: 5000 },
//   { id: 4, title: "Gamepad", price: 4500 },
// ];

// const renderProduct = (product) => {
//   const {
//     title,
//     price,
//     img = "https://www.tibs.org.tw/images/default.jpg",
//   } = product;
//   return `<div class="product-item">
//                 <img class="defaultImage" src="${img}" />
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// };

// const renderProducts = (productsArray) => {
//   const productsNode = document.querySelector(".products");
//   productsArray.forEach((product) => {
//     productsNode.insertAdjacentHTML("beforeend", renderProduct(product));
//   });
// };

// renderProducts(products);

// TEACHERS CODE HW 1

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
