const express = require('express')
const router = express.Router()

const User = require('../models/user');

// Get Watchlist by ID - Returning the entire customer which the order corresponds
router.get('/:id', async (req, res) => {
    const watchlistID = req.params.id
    req.body._id = watchlistID
    try {
        const result = await User.find(
            { 'watchlists._id' : watchlistID },
        )
        /* console.log(result) */
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Update Watchlist by ID
router.patch('/:id', async (req, res) => {
    const watchlistID = req.params.id;
    req.body._id = watchlistID; // So it keeps same ID or else it would create a "new object" with a new ID
    const {name, notes, data} = req.body;
    let result;
    try {
        result = await User.findOneAndUpdate(
            { 'watchlists._id': watchlistID },
            { $set: { 'watchlists.$.name': name, 'watchlists.$.notes': notes, 'watchlists.$.data': data } },
            { new: true }
        )
    } catch(error) {
        res.status(500).send(error.message)
    }
    result ? res.json(result) : res.status(404).json({error: 'Something went wrong'})
})

module.exports = router