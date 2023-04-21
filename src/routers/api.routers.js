import express,{Router} from 'express'
import { randomUUID} from 'crypto'
import { cartModel } from '../models/carts.js';
import { messageModel } from '../models/messages.js';
import { productModel } from '../Managers/ProductManager.js';
import { cartManager } from '../Managers/CartManager.js';
import { postProductController } from '../controllers/postProductController.js';
import { postUsuarios } from '../controllers/usuarios.controller.js';
import * as sesionesController from '../controllers/sesiones.controller.js'

export const apiRouter= Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.post("/realTimeProducts", postProductController);

apiRouter.post("/usuarios",postUsuarios);
apiRouter.post('/sesiones', sesionesController.postSesiones)
apiRouter.delete('/sesiones', sesionesController.deleteSesiones)


apiRouter.delete('/carts/:cid/products/:pid', async (req, res) => {
  
    try {
      const carritoActualizado = await cartManager.borrarProductoDelCarrito(req.params.cid, req.params.pid);
      res.json(carritoActualizado);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })


  apiRouter.put('/carts/:cid/products/:pid', async (req,res,next)=>{

    try {
      const carritoActualizado = await cartManager.reemplazarProductosdeCarrito(req.params.cid, req.params.pid);
      res.json(carritoActualizado);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  })
  

  apiRouter.put('/carts/:cid/products/:pid/:nquantity', async (req,res,next)=>{

    const { quantity } = req.body;  
    // Buscamos el carrito de compras correspondiente a :cid
    const cart = await cartModel.findById(req.params.cid);
    // Buscamos el producto correspondiente a :pid
    const product = await productModel.getProductById(req.params.pid);
    //@ts-ignore
    const nombreProducts=cart.nombreProducts
    //@ts-ignore
    nombreProducts.quantity=req.params.nquantity
    //@ts-ignore
    await cart.save()
    res.json(cart);
  })


  apiRouter.delete('/api/carts/:cid', async (req, res) => {
    try {
      // Buscar el carrito de compras correspondiente a :cid
      const cart = await cartModel.findById(req.params.cid);
  
      // Actualizar el campo "nombreProducts" para que esté vacío
      await cartModel.updateOne(
        //@ts-ignore
        { _id: cart._id },
        { nombreProducts: {} }
      );
  
      // Enviar una respuesta de éxito
      res.status(204).send();
    } catch (error) {
      // Si ocurre un error, enviar una respuesta de error con un código 500
      res.status(500).json({ error: error.message });
    }
  });
  
  