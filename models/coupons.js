const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Course Schema
const couponSchema = new Schema(
    {
        coupon_code: {
            type: String,
            required: true,
            trim: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        course_id:{
            type: Schema.Types.ObjectId,
            ref: "courses",
            required: true
        },
        validity:{
            type:String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const Coupon = mongoose.model("coupons", couponSchema);

module.exports = Coupon;