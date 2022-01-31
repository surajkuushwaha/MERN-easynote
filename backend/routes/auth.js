const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/" doesn't require auth

router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
        res.json({error: 'Please enter a unique value for email', message: err.message})})
    // res.send(req.body);
})
module.exports = router