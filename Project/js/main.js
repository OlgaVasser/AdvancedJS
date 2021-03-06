const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject("Error");
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
};

///////////////////////////////////////

class ProductList {
  #goods;
  #allProducts;

  constructor(container = ".products") {
    console.log("constructor");
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];
    this.#getProducts().then((data) => {
      this.#goods = [...data];
      this.#render();
    });
    this.init();
  }

  init() {
    document
      .querySelector(this.container)
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("buy-btn")) {
          cartList.addItem(event.target.parentNode);
        }
      });
  }

  goodsTotalPrice() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
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
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item">
              <img src="${this.img}" alt="Some img">
              <div class="desc" data-id_product="${this.id}" data-price="${this.price}" data-product_name="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

class CartList {
  constructor(container = ".basket") {
    this.container = container;
    this.cartItems = [];
    this.cartItemsHTML = [];
    this.getCartItems().then((data) => {
      this.cartItems = [...data.contents];
      this.render();
    });
    this.init();
  }

  init() {
    document
      .querySelector(this.container)
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("del-btn")) {
          this.removeItem(event.target.parentNode);
          console.log(event);
        }
      });
  }

  getCartItems() {
    return fetch(`${API}/getBasket.json`)
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }

  addItem(product) {
    const cartItem = {
      id_product: +product.dataset.id_product,
      price: +product.dataset.price,
      product_name: product.dataset.product_name,
      quantity: 1,
    };

    const productExist = this.cartItems.filter(
      (item) => item.id_product === cartItem.id_product
    );

    if (productExist.length > 0) {
      productExist[0].quantity += 1;
    } else {
      this.cartItems.push(cartItem);
    }
    this.render();
  }

  removeItem(item) {
    item.closest(".cart-item").remove();
  }

  getCartTotalPrice() {
    const totalPrice = this.cartItems.reduce((accum, item) => {
      return accum + item.price * item.quantity;
    }, 0);
    return totalPrice;
  }

  render() {
    const block = document.querySelector(this.container);
    block.innerHTML = "";
    this.cartItems.forEach((item) => {
      const itemObject = new CartItem(item);
      this.cartItemsHTML.push(itemObject);
      block.insertAdjacentHTML("beforeend", itemObject.render());
    });
    block.insertAdjacentHTML(
      "beforeend",
      `<p class="price_basket">Итого: ${this.getCartTotalPrice()}</p>`
    );
  }
}

class CartItem {
  constructor(item, img = "https://placehold.it/200x150") {
    this.title = item.product_name;
    this.price = item.price;
    this.id = item.id_product;
    this.quantity = item.quantity;
    this.img = img;
  }

  render() {
    return `<div class="cart-item">
              <img src="${this.img}" alt="Some img">
              <div class="item_cart">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <p>${this.quantity}</p>
                  <button class="del-btn">x</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();
const cartList = new CartList();
