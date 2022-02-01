const express = require('express');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');


//ROUTE 1: Get all the notes: GET "/api/notes/fetchAllNotes" . No login required
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: Add a new notes using: POSST "/api/notes/addnote" . login required
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

//ROUTE 3: update an existion note using : POST "/api/notes/addnote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a newnote object
        const newNote={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not found")};

        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
        
    } catch (error) {
        console.log(error.message+"here");
        res.status(500).send("Internal server error");
    }
})


module.exports = router