const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: true,
        unique: true,
    },
    "password": {
        type: String,
        required: true,
        minlength: 4
    },
    "watchlists": [
        {
            "name": String,
            "notes": String,
            "data": [{
                    "ticker": String,
                    "companyName": String,
                    "lastPrice": Number,
                    "lastScore": Number,
                    "lastMktCap": Number,
                    "lastPE": Number,
                    "lastPB": Number,
                    "lastPFCF": Number,
                    "buyTarget": Number,
                    "notes": String
                }
            ]
        }
    ]
})

module.exports = mongoose.model('User', userSchema)