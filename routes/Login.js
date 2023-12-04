const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user');
/* const { restart } = require('nodemon'); */

router.post('/', async (req, res) => {
    const {username, password} = req.body.formData
    const user = await User.findOne({username: username})
    if (user == null) {
        return res.json("Account doesnt exist")
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            res.json(user)
        }
        else {
            res.json("Invalid password")    
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router