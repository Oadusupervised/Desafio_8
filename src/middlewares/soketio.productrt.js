import { productModel } from "../Managers/ProductManager.js";

export async function socketFn(req, res, next) {
  const products = await productModel.getProducts();

}
