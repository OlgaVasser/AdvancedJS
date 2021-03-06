const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    catalogUrl: "/catalogData.json",
    basketUrl: "/getBasket.json",
    addToBasketUrl: "/addToBasket.json",
    removeProductUrl: "deleteFromBasket.json",
    imgCatalog: "https://placehold.it/200x150",
    imgCart: "https://placehold.it/50x100",
    products: [],
    cartItems: [],
    searchLine: "",
    isVisibleCart: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
    addProduct(product) {
      console.log(product);
      this.getJson(`${API}/${this.addToBasketUrl}`).then((data) => {
        if (data.result === 1) {
          let productId = product.id_product;
          let find = this.cartItems.find(
            (cartItem) => cartItem.id_product === productId
          );
          if (find) {
            find.quantity++;
          } else {
            let cartItem = {
              id_product: productId,
              price: product.price,
              product_name: product.product_name,
              quantity: 1,
            };
            this.cartItems = [...this.cartItems, cartItem];
          }
        } else {
          alert("Error");
        }
      });
    },
    removeProduct(element) {
      this.getJson(`${API}/${this.removeProductUrl}`).then((data) => {
        if (data.result === 1) {
          let productId = element.id_product;
          let find = this.cartItems.find(
            (cartItem) => cartItem.id_product === productId
          );
          if (find.quantity > 1) {
            find.quantity--;
          } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
          }
        } else {
          alert("Error");
        }
      });
    },

    filter() {
      console.log(this.searchLine);
      const regexp = new RegExp(this.searchLine, "i");
      const filtered = this.products.filter((product) =>
        regexp.test(product.product_name)
      );
      console.log(filtered);
      this.products = filtered;
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    this.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.products.push(el);
      }
    });
    this.getJson(`${API + this.basketUrl}`).then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
      }
    });
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("beforeDestroy");
  },
});
