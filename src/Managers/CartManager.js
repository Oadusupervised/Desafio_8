import fs from 'fs/promises'
import { cartModel } from '../models/carts.js'
import mongoose from 'mongoose'
import mongoosePagine from 'mongoose-paginate-v2'

 export class CartManager {
  #productos;
  constructor() {
    cartModel.find({}, (err, carts) => {
      if (err) {
        console.error(err);
      } else {
        this.#productos = carts;
        console.log('Productos cargados correctamente:', this.#productos);
      }
    }).lean();
  }

    async guardarCarrito(productos) {
        const carrito= new this.#productos(productos)
        await carrito.save()
        return carrito    
    }

    async mostrarCarrito(lim) {
        const carritos = await this.#productos.find().limit(lim)
        return carritos
      }
      

    async buscarCosas() {
        //const carritos = await this.#productos.find().lean()
        //return carritos
        this.#productos
    }

    /*async buscarCaractProducto(idProduct) {
        const producto = await this.#productosManager.findById(idProduct).lean()
        if (!producto) {
            throw new Error('id no encontrado')
        }else{
            return producto.title
        }
    }
*/
    async buscarCarritoSegunId(idCarrito) {
        const buscada = this.#productos.findById(idCarrito).lean()
        if (!buscada) {
            throw new Error('id no encontrado')
        }else{
        return buscada
        }
    }

    async reemplazarProductosdeCarrito(id, nuevaproductos) {
        const carrito = await this.#productos.findOneAndUpdate(
            { id: id },
            { nombreProducts: nuevaproductos },
            { new: true }
        ).exec()
    
        if (!carrito) {
            throw new Error('id no encontrado')
        }
    
        return carrito.nombreProducts
    }
    

    async borrarCarritoSegunId(id) {
        const carritoBorrado = await this.#productos.findByIdAndDelete(id).lean()
        if (!carritoBorrado) {
          throw new Error('id no encontrado');
        }
        return carritoBorrado;
      }

      async borrarProductoDelCarrito(cid, pid) {
        const carritoActualizado = await this.#productos.findByIdAndUpdate(cid, {
          $pull: {
            productos: {
              _id: pid
            }
          }
        }, { new: true }).lean();
        
        if (!carritoActualizado) {
          throw new Error('El carrito no fue encontrado');
        }
        
        return carritoActualizado;
      }

      
    async reset() {
        await this.#productos.deleteMany({})
      }
      
}

export const cartManager = new CartManager()


