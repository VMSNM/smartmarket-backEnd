const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user');
const Log = require('../models/log');

router.post('/', async (req, res) => {
    const {username, password} = req.body.formData
    const user = await User.findOne({username: username})
    if (user == null) {
        return res.json("Account doesnt exist")
    }
    try {
        console.log(password, user.password)
        if (password === user.password) {
        /* if (await bcrypt.compare(password, user.password)) { */
            res.json(user)
            
            const log = new Log({ username: user.username, date: new Date() })
            try {
                await log.save()
                console.log(log)
            } catch (error) {
                res.status(500).json(error)        
            }
        }
        else {
            res.json("Invalid password")    
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router