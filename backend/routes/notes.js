const express = require('express');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');


//ROUTE 1: Get all the notes: GET "/api/auth/createUser" . No login required
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: Add a new notes using: POSST "/api/auth/addnote" . No login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.log(error.message+"here");
        res.status(500).send("Internal server error");
    }
})
module.exports = router