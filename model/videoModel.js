const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videoSchema = new Schema({
    owner:Schema.Types.ObjectId,
    cat:String,
    title:String,
    price:String,
    url:String
})

const Video = mongoose.model('video',videoSchema)
module.exports = Video