const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


// @route /api/users
// @desc Register a user
// @access Public
router.post('/',  
body('name','Please enter a Name ').not().isEmpty(),
body('email','Please enter an email').isEmail(),
body('password', 'Please enter a password at least 5 chars').isLength({ min: 5 }),
(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send("Passed")
})

module.exports = router