const express = require('express');
const User = require('../db/models/User');

const router = express.Router();

// Index: Get all users
router.get('/', (req, res, next) => {
	User.find({}).then((user) => {
		res.json(user);
	})
    .catch(next)
});

// Show: Get one user by id
router.get('/:id', (req, res, next) => {
	User.findById({ _id: req.params.id }).then((user) => {
		if (user) {
            res.json(user);
        } else {
            res.sendStatus(404)
        }
	})
    .catch(next)
});

// Create: Add an user
router.post('/', (req, res) => {
	User.create(req.body).then((user) => {
		res.status(201).json(user);
	});
});

// Update: Edit an user by id
router.put('/:id', (req, res, next) => {
	User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404)
            }
        })
        .catch(next)
});

// Delete: Remove an user by id
router.delete('/:id', (req, res, next) => {
	User.findByIdAndDelete({ _id: req.params.id })
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404)
        }
	})
    .catch(next)
});

module.exports = router;