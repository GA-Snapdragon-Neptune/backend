const express = require('express');
const FoodTruck = require('../db/models/FoodTruck');

const router = express.Router();

// Index: Get all food trucks
router.get('/', (req, res) => {
	FoodTruck.find({}).then((foodTruck) => {
		res.json(foodTruck);
	});
});

// Show: Get one food truck by id
router.get('/:id', (req, res) => {
	FoodTruck.findById({ _id: req.params.id }).then((foodTruck) => {
		res.json(foodTruck);
	});
});

// Show: Get one food truck by flavor
router.get('/flavors/:flavor', (req, res) => {
	FoodTruck.findOne({ flavor: req.params.flavor }).then((foodTruck) => {
		res.json(foodTruck);
	});
});

// Create: Add an food truck
router.post('/', (req, res) => {
	FoodTruck.create(req.body).then((foodTruck) => {
		res.status(201).json(foodTruck);
	});
});

// Update: Edit an food truck by id
router.put('/:id', (req, res) => {
	FoodTruck.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((foodTruck) => {
		res.json(foodTruck);
	});
});

// Delete: Remove an food truck by id
router.delete('/:id', (req, res) => {
	FoodTruck.findByIdAndDelete({ _id: req.params.id }).then((delCone) => {
		res.json(delCone);
	});
});

module.exports = router;
