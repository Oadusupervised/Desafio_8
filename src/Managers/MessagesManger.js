import fs from 'fs/promises'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { messageModel } from '../models';


export class messagesManager{
    #mensajes;
    constructor() {
      messageModel.find({}, (err, carts) => {
        if (err) {
          console.error(err);
        } else {
          this.#mensajes = carts;
          console.log('Productos cargados correctamente:', this.#mensajes);
        }
      });
    }

    async mostrarMensajes() {
        const mensajes = await this.#mensajes.find().lean()
        return mensajes
    }


    async guardarMensajes(mensajes) {
        const mensjaes= new this.#mensajes(mensajes)
        await mensjaes.save()
        return mensjaes    
    }

      
    async reset() {
        await this.#mensajes.deleteMany({}).exec()
    }


}
export const mensajesManager = new messagesManager()