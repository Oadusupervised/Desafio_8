import { usuarioModel } from '../models/usuario.model.js'

export async function postUsuarios(req, res, next) {
  console.log(req.body)
  const usuarioCreado = await usuarioModel.create(req.body)

  req.session.user = {
    name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
    email: usuarioCreado.email,
    age: usuarioCreado.age,
  }

  res.status(201).json(usuarioCreado)
}