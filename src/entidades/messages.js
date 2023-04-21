export default class Messages {
  #user;
  #message;

  constructor({ user, message }) {
    this.#user = user;
    this.#message = message;
  }

  // Geters

  get autor() {
    return this.#user;
  }
  get mensaje() {
    return this.#message;
  }

  //metodos para acceder a copia y proteger original
  datos() {
    return {
      autor: this.#user,
      mensaje: this.#message,
    };
  }
}
