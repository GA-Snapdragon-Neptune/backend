const express = require('express');
const FoodTruck = require('../db/models/FoodTruck');

const router = express.Router();
const { requireToken } = require('../middleware/auth');


// Index: Get all food trucks
router.get('/', (req, res, next) => {
	FoodTruck.find({})
	.populate('owner')
	.then((foodTruck) => {
		res.status(200).json(foodTruck);
	})
	.catch(next)
});

// Show: Get one food truck by id
router.get('/:id', (req, res, next) => {
	FoodTruck.findById({ _id: req.params.id }).then((foodTruck) => {
		if (foodTruck) {
			res.status(200).json(foodTruck)
		} else {
			res.sendStatus(404)
		}
	})
	.catch(next)
});

// Create: Add a food truck
router.post('/', (req, res) => {
	FoodTruck.create(req.body).then((foodTruck) => {
		res.status(201).json(foodTruck);
	});
});

// Update: Edit a food truck by id
router.put('/:id', (req, res, next) => {
	FoodTruck.findByIdAndUpdate(
		{ _id: req.params.id }, 
		req.body, 
		{ new: true, })
		.then((foodTruck) => {
			if (foodTruck) {
				console.log(req.user._id);
				res.json(foodTruck);
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
});

// Delete: Remove a food truck by id
router.delete('/:id', (req, res, next) => {
	FoodTruck.findByIdAndDelete({ _id: req.params.id })
	.then((foodTruck) => {
		if (foodTruck) {
			res.json(foodTruck);
		} else {
			res.sendStatus(404)
		}
	})
	.catch(next)
});

module.exports = router;
