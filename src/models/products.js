import mongoose from 'mongoose'
import mongoosePagine from 'mongoose-paginate-v2'

export const schemaProducts = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], required: true },
    id: { type: String, required: true },
    status: { type: String, required: true }
  }, { versionKey: false });

  schemaProducts.plugin(mongoosePagine)
  export const productOperator =  mongoose.model("products", schemaProducts);
