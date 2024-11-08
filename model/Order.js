const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    // driver: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "driver",
    //     required: true
    // },
    Items: [
        {
            Food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true
            },
            qty: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    TotalAmount: {
        type: Number,
        required: true
    },
    Payement: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "Delivered"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{ timestamps: true })

module.exports = mongoose.model("Order", OrderModel)