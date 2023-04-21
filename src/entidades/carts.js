import { randomUUID } from "crypto";

// persistencia en archivos descomentar id

//mongoose

export default class Carts {
  #id
  #nombreProducts;
  constructor({id,nombreProducts}) {
    this.#id = id
    this.#nombreProducts = [];
  }
  // get id() {
  //   return this.#id;
  // }

  get products() {
    return this.#nombreProducts;
  }

  //metodos para acceder a copia y proteger original
  datos() {
    return {
      // id: this.#id,
      products: this.#nombreProducts,
    };
  }
}
