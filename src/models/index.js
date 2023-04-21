import mongoose from 'mongoose';

const MONGODB_CNX_STR ='mongodb://127.0.0.1:27017/ecommerce'

export async function conectar(){
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`conectada a la base ${MONGODB_CNX_STR}`)
}



export { cartModel } from './carts.js'
export { messageModel } from './messages.js'
//export {productModel} from './products.js'


