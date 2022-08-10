const express = require('express');
const FoodTruck = require('../db/models/FoodTruck');

const router = express.Router();
const { requireToken } = require('../middleware/auth');

const User = require('../db/models/User');

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
router.post('/', requireToken, (req, res, next) => {
	const requestor = req.user._id.toString()
	User.findById({_id: requestor})
	.then((user) => {
		console.log(user.business)
		if (user && user.business === true) {
			FoodTruck.create(req.body)
			.then((foodTruck) => {
				return res.status(201).json(foodTruck);
			})
			.catch(next)
		} else {
			res.sendStatus(401)
		}
	})
	.catch(next)
});

// Update: Edit a food truck by id
router.put('/:id', requireToken, (req, res, next) => {
	const requestor = req.user._id.toString()
	User.findById({_id: requestor})
	.then((user) => {
		if (user && user.business === true) {
			FoodTruck.findByIdAndUpdate(
				{ _id: req.params.id }, 
				req.body, 
				{ new: true, })
				.then((foodTruck) => {
					if (foodTruck) {
						if (foodTruck.owner._id.toString() === requestor){
							res.json(foodTruck);
						} else {
							res.sendStatus(401)
						}
					} else {
						res.sendStatus(404)
					}
				})
				.catch(next)
		} else {
			res.sendStatus(401)
		}
	})
	.catch(next)
});

// Delete: Remove a food truck by id
router.delete('/:id',requireToken, (req, res, next) => {
	// saves the requestor id
	const requestor = req.user._id.toString()
	// finds the user with the requestor id
	User.findById({_id: requestor})
	.then((user) => {
		FoodTruck.findById({_id: req.params.id})
		.then((foodTruck) => {
			// checks if requestor is a business
			if (user.business === true && foodTruck.owner._id.toString() === requestor) {
				FoodTruck.findByIdAndDelete({ _id: req.params.id })
				.then((foodTruck) => {
					res.json(foodTruck);
					})
			} else {
				res.sendStatus(401)
			}
		})
		.catch(next)

		})
	.catch(next)
});

module.exports = router;
