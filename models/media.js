const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Course Schema
const mediaSchema = new Schema(
    {
        course_id: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true
        },
        video_title:{
            type:String,
            required:true,
            trim:true
        },
        video_Description:{
            type:String,
            required:true,
            trim:true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        category: {
            type:String,
            require:true,
            trim:true
        },
        link: {
            type: String,
            trim: true,
            required: true
        },
    },
    { timestamps: true }
);

const Media = mongoose.model("medias", mediaSchema);

module.exports = Media;