const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    pass:String,
    uploads:[Object],
    admin:{type:String,default:'false'}
})

const Client = mongoose.model('client',clientSchema)
module.exports = Client