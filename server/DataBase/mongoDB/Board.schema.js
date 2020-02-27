const mongoose = require("mongoose");


const BoardSchema = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('boards', BoardSchema, 'boards');