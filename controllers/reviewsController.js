const express = require ('express')
const router = express.Router()

const FoodTruck = require('../db/models/FoodTruck');
const { requireToken } = require('../middleware/auth');

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


router.post('/', requireToken, (req, res, next) => {
    const foodTruckId = req.body.foodTruckId;
    FoodTruck.findById(foodTruckId)
    .then((foodTruck) => {
        const requestor = req.user._id.toString()
        if (foodTruck) {
            if (requestor) {
                foodTruck.reviews.push(req.body)
                return foodTruck.save()
            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(404)
        }})
    .then((foodTruck) => res.status(201).json( { foodTruck: foodTruck } ))
    .catch(next)
})

router.delete('/:foodTruckId/:reviewId' , requireToken, (req, res, next)=>{
    FoodTruck.findById(req.params.foodTruckId)
    .then((foodTruck)=>{
        if(foodTruck){
            const foundReview = foodTruck.reviews.id(req.params.reviewId)
            if (!foundReview) {
                return res.sendStatus(404)
            }
            const author = foundReview.author.toString()
            const requestor = req.user._id.toString()
            if (foundReview && author === requestor) {
                foundReview.remove()
                foodTruck.save()
                res.sendStatus(204)
            } else if (author !== requestor){
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(404)
        }
    })
    .catch(next)
})

router.put('/:reviewId', requireToken, (req, res, next) => {
    const reviewId = req.params.reviewId
    FoodTruck.findOne({
        'reviews._id': reviewId,
    })
    .then((foodTruck)=>{
        if (foodTruck) {
            const foundReview = foodTruck.reviews.id(reviewId)
            const author = foundReview.author.toString()
            const requestor = req.user._id.toString()
            if (foundReview && author === requestor) {
                foundReview.set(req.body)
                foodTruck.save()
                return res.status(201).json( { foodTruck: foodTruck } )
            } else if (author !== requestor){
                res.sendStatus(401)
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }
    })
    .catch(next)
})


module.exports = router;