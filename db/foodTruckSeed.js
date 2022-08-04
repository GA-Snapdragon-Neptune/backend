const mongoose = require('./connection');
const seedData = require('./foodTruckSeed.json');
const FoodTruck = require('./models/FoodTruck');

FoodTruck.deleteMany({})
	.then(() => {
		FoodTruck.insertMany(seedData).then((foodTruck) => {
			console.log(foodTruck);
			process.exit();
		});
	})
	.catch((err) => console.error(err));
