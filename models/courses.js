const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Course Schema
const courseSchema = new Schema(
    {
        course_name: {
            type: String,
            required: true,
            trim: true
        },
        course_Description:{
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
        price:{
            type:String,
            require: true,
            trim: true
        },
        links: [{
            type: Schema.Types.ObjectId,
            ref: "medias",
            required: true
        }],
        coupons:[{
            type: Schema.Types.ObjectId,
            ref: "coupons",
        }],
        purchasedBy:[{
            type: Schema.Types.ObjectId,
            ref:"users"
        }]
    },
    { timestamps: true }
);

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;