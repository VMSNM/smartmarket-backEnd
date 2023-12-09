const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: true
    },
    "date": {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Log', logSchema)