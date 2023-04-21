import { productOperator } from "../models/products.js"
export async function postProductController(req, res, next) {
  console.log(req.body)
  const usuarioCreado = await productOperator.create(req.body)
  res.status(201).json(usuarioCreado)
}