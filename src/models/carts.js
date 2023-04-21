import mongoose, { Schema } from 'mongoose'
import mongoosePagine from 'mongoose-paginate-v2'

export const schemaCarts = new mongoose.Schema({
    id:{type:String, required:true},
    nombreProducts: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId, // este Schema estaba en minusculas en la diapo, ojo, va en mayúsculas!
                    ref: 'product'
                }
            }
        ],
        default: [], // este default faltaba en la diapositiva, ojo!
    },
},{versionKey:false})

schemaCarts.plugin(mongoosePagine)
export const cartModel = mongoose.model('carts',schemaCarts)
