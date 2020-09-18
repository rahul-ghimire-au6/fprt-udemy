const mongoose = require("mongoose")
const Schema = mongoose.Schema

const uploaderSchema = new Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    pass:String,
    uploads:[Object],
    admin:{type:String,default:'true'}
})

const Uploader = mongoose.model('uploader',uploaderSchema)
module.exports = Uploader