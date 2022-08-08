// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require("helmet");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(':date - :method (:url) :status - :response-time ms'));
app.use(helmet());
const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);

app.set('port', process.env.PORT || 8000);

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

//Error Handler
app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
  });

app.listen(app.get('port'), () => {
	console.log('connected');
});

module.exports = app;