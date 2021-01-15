const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');


// @route /api/auths
// @desc Get logged in user
// @access Private
router.get('/', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})   
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})



// @route /api/auths
// @desc Loign a user
// @access Public
router.post('/',
    body('email','Please enter a valid email').isEmail(),
    body('password', 'Password is required').exists(),
    async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        //get client input
        const { email, password} = req.body   

        try {
            // check if user (the email) exists?
            let user =  await User.findOne({email})
            //No
            if (!user){
                res.status(400).json({msg: 'Invalid credentials'})
            }
            //Yes , then check if the password matchs?
            let isMatch = await bcrypt.compare(password, user.password)
            //No
            if (!isMatch){
                res.status(400).json({msg: 'Invalid credentials'})
            }
            //Yes, then send token back to client 
            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(payload,config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => {
                  if(err){
                      throw err
                  }
                  res.json({token})
            }) 
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error')
        }
})



module.exports = router