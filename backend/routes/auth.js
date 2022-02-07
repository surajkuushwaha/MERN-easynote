const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thi$i$@$ecret$tring"


//ROUTE 1: create a user using: POST "/api/auth/createUser" . No login required

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    let success= false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // checks whether the user with this email exists already
    try {

        let user = await User.findOne({ email: req.body.email });
        console.log()
        if (user) {
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success =true;
        res.json({success, authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");

    }
})

// ROUTE 2: create a user using: POST "/api/auth/login" . No login required
router.post('/login', [
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success,authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }


})


//ROUTE 3: GET LOGGEDIN user data using: POST "/api/auth/getUser" .login required
router.post('/getUser',fetchuser,async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }


})


module.exports = router