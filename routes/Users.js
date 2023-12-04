const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user');

// Get all Users
router.get('/', async (req, res) => {
    try {
        const result = await User.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get User by ID
router.get('/:id', async (req, res) => {
    try {
        /* const {id: customerId} = req.params */
        const result = await User.findById(req.params.id)
        !result ? res.status(404).json("User not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New User
router.post('/', async (req, res) => {
    try {
        /* const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt(10)) */
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({ username: req.body.username, password: hashedPassword, watchlists: req.body.watchlists })
        await user.save()
        res.status(201).json(user)
        console.log(user)
    } catch(error) {
        res.status(500).json(error.message)
    }
})

// Update a existing User (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const result = await User.findByIdAndUpdate({_id: userID}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing User
router.delete('/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const result = await User.deleteOne({_id: userID})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router