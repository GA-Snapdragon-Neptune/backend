const express = require('express');
const User = require('../db/models/User');
const bcrypt = require('bcrypt');

const router = express.Router();
const { requireToken } = require('../middleware/auth');
const { createUserToken } = require('../middleware/auth');


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
// router.post('/', (req, res) => {
// 	User.create(req.body).then((user) => {
// 		res.status(201).json(user);
// 	});
// });

// user sign up
router.post('/signup', (req, res, next) => {
    bcrypt 
    .hash(req.body.password, 10)
    .then(hash =>
        ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            consumer: req.body.consumer,
            business: req.body.business,
        }))
    .then(user => User.create(user))
    .then(user => res.status(201).json(user))
    .catch(next)
})

// user sign in
router.post('/signin', (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then((user)=> createUserToken(req, user))
    .then((token)=> res.json({token}))
    .catch(next)
})

// Update: Edit an user by id
router.put('/:id', requireToken, (req, res, next) => {
    if(req.params.id.toString()===req.user._id.toString()) {
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
    }else {
        res.sendStatus(401)
    }
});

// Delete: Remove an user by id
router.delete('/:id', requireToken, (req, res, next) => {
    if(req.params.id.toString()===req.user._id.toString()) {
        User.findByIdAndDelete({ _id: req.params.id })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404)
            }   
        })
        .catch(next)
    } else {
        res.sendStatus(401)
    }
});

module.exports = router;