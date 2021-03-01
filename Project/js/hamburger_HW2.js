// для проверки кода временно подключила к нашему index.html

class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.hamburgersSize = {};
    this.hamburgersStuffing = {};
    this.hamburgersTopping = {};
    this.addedTopping = [];
    this.fetchHamburgersSize();
    this.fetchStuffing();
    this.fetchTopping();
  }

  fetchHamburgersSize() {
    this.hamburgersSize = {
      small: { price: 50, calories: 20 },
      big: { price: 100, calories: 40 },
    };
  }

  fetchStuffing() {
    this.hamburgersStuffing = {
      cheese: { price: 10, calories: 20 },
      salad: { price: 20, calories: 5 },
      potato: { price: 15, calories: 10 },
    };
  }

  fetchTopping() {
    this.hamburgersTopping = {
      seasoning: { price: 15, calories: 0 },
      mayonnaise: { price: 20, calories: 5 },
    };
  }
  getSize() {
    return this.size;
  }

  getStuffing() {
    return this.stuffing;
  }

  addTopping(topping) {
    if (this.hamburgersTopping[topping]) {
      this.addedTopping.push(topping);
    }
  }

  // даный метод завел в тупик, сама не справилась, обращалась за помощью((
  removeTopping(topping) {
    const toppingIndex = this.addedTopping.indexOf(topping);
    return this.addedTopping.splice(toppingIndex, 1);
  }

  getToppings() {
    return this.addedTopping;
  }

  calculatePrice() {
    const hambPrice = +this.hamburgersSize[this.size].price;
    const stuffPrice = +this.hamburgersStuffing[this.stuffing].price;
    const toppingPrice = this.addedTopping.reduce((accum, topping) => {
      return accum + this.hamburgersTopping[topping].price;
    }, 0);
    return hambPrice + stuffPrice + toppingPrice;
  }

  calculateCalories() {
    const hambCalories = +this.hamburgersSize[this.size].calories;
    const stuffCalories = +this.hamburgersStuffing[this.stuffing].calories;
    const toppingCalories = this.addedTopping.reduce((accum, topping) => {
      return accum + this.hamburgersTopping[topping].calories;
    }, 0);
    return hambCalories + stuffCalories + toppingCalories;
  }
}

const hamb = new Hamburger("small", "cheese");
