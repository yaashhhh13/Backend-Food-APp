const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 


const FoodSchema = new mongoose.Schema({
    FoodName: {
        type: String,
        required: true
    },
    FoodPrice: {
        type: Number,
        required: true
    },
    FoodDescription: {
        type: String,
        required: true
    },
    FoodCategory: {
        type: String,
        required: true
    },
    FoodWeight: {
        type: Number,
        required: true
    },
    FoodReviews: [reviewSchema],
    FoodImage: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Enable timestamps here

module.exports = mongoose.model("Food", FoodSchema);