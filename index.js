// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
// placeholder for controller import

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('port', process.env.PORT || 3000);

// Redirect
app.get('/', (req, res) => {
	res.redirect('/foodtrucks');
});

// Controllers
const foodTrucksController = require('./controllers/foodTrucksController');
app.use('/foodtrucks', foodTrucksController);

const reviewsController = require('./controllers/reviewsController');
app.use('/reviews', reviewsController);

const usersController = require('./controllers/usersController');
app.use('/users', usersController);

app.listen(app.get('port'), () => {
	console.log('connected');
});

module.exports = app;