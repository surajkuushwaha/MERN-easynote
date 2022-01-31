const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: date,
        default: Date.now
    },
});

module.exports = mongoose.models('notes', NoteSchema);