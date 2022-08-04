const express = require ('express')
const router = express.Router()

const FoodTruck = require('../db/models/FoodTruck');

router.get('/:foodTruckId', async (req, res, next) => {
    try {
      // find the restaurant first
      const foodTruck = await FoodTruck.findById(req.params.foodTruckId)
  
      if (foodTruck) {
        // respond with all of the reviews for that restaurant
        res.json(foodTruck.reviews)
      } else {
        // if you can't find it, send a 404
        res.sendStatus(404)
      }
    } catch (err) {
      next(err)
    }
  })
  



module.exports = router;
