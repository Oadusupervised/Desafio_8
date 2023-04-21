import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schemaMessages = new mongoose.Schema({
    user:{type:String,required:true},
    message:{type:String,required:true}
},{versionKey:false})

schemaMessages.plugin(mongoosePaginate)
export const messageModel = mongoose.model('messages',schemaMessages)
