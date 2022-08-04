const express = require ('express')
const router = express.Router()

const FoodTruck = require('../db/models/FoodTruck');

router.get('/:foodTruckId',(req,res,next)=>{
    FoodTruck.findById(req.params.foodTruckId)
    .populate('reviews.author')
    .then ((foodTruck)=>{
        if (foodTruck){
            res.json(foodTruck.reviews)
        } else {
            res.sendStatus(404)
        }
        
    })
    .catch(next)
})

router.get('/:foodTruckId/:reviewId', (req, res, next) =>{
    FoodTruck.findById(req.params.foodTruckId)
    .populate('reviews.author')
    .then((foodTruck) => {
        if(foodTruck) {
            const foundReview=foodTruck.reviews.find(review=>review._id.toString()=== req.params.reviewId)
            if (foundReview) {
                res.json(foundReview)
            }
            else {
                res.sendStatus(404)
            }
        } else 
            res.sendStatus(404)
    })
    .catch(next)
})


router.post('/', (req, res, next) => {
    const foodTruckId = req.body.foodTruckId;
    FoodTruck.findById(foodTruckId)
    .then((foodTruck) => {
        if (foodTruck) {
            foodTruck.reviews.push(req.body)
            return foodTruck.save()
        } else {
            res.sendStatus(404)
        }})
    .then((foodTruck) => res.status(201).json( { foodTruck: foodTruck } ))
    .catch(next)
})

router.delete('/:foodTruckId/:reviewId',(req, res, next)=>{
    FoodTruck.findById(req.params.foodTruckId)
    .then((foodTruck)=>{
        if(foodTruck){
            foodTruck.reviews.id(req.params.reviewId).remove()
            foodTruck.save()
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
    .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
    const reviewId = req.params.reviewId
    FoodTruck.findOne({
        'reviews._id': id,
    })
    .then((foodTruck)=>{
        if (foodTruck) {
            const review = foodTruck.reviews.id(reviewId)
            review.set(req.body)
            return foodTruck.save()
        } else {
            res.sendStatus(404)
        }
    })
    .then((foodTruck)=>res.status(201).json( { foodTruck: foodTruck } ))
    .catch(next)
})


module.exports = router;