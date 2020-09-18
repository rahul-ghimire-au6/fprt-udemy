const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    owner:Schema.Types.ObjectId,
    videoId:String
})
orderSchema.index({ videoId: 1 });

const Order = mongoose.model('order',orderSchema)
module.exports = Order