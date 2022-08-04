const mongoose = require('../connection')
const Schema = mongoose.Schema
const reviewSchema = require('./Review')


const FoodTruckSchema = new Schema(
    {
        name: String,
        location: String,
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