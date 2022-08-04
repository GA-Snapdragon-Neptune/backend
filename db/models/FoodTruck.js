const mongoose = require('../connection')
const Schema = mongoose.Schema
const reviewSchema = require('./Review')


const FoodTruckSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        menu: [ {
            name: String,
            price: Number,
            description: String
        } ],
        reviews: [reviewSchema]
    }
)

const FoodTruck = mongoose.model("FoodTruck", FoodTruckSchema)

module.exports = FoodTruck