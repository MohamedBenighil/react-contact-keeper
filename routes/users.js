const express = require("express")
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');


// @route /api/users
// @desc Register a user
// @access Public
router.post('/',  
body('name','Please enter a Name ').not().isEmpty(),
body('email','Please enter an email').isEmail(),
body('password', 'Please enter a password at least 5 chars').isLength({ min: 5 }),
async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    //get client input
    const {name, email, password} = req.body

    try {
      // check if user exists
      let user = await User.findOne({email})
      //yes
      if (user){
          return res.status(400).json({msg: 'User already exists'})
      }
      //no
      user = new User({
          name,
          email,
          password
      })
      //generate a salt (key)
      const salt = await bcrypt.genSalt(10)
      //hash password
      user.password = await bcrypt.hash(password, salt)
      //save to db
      await user.save()
      res.send('User saved')

    } catch (error) {
        //print error (for devlopper)
        console.log(error.message)
        //send a message for client
        res.status(500).send('Server Error')
    }
})

module.exports = router