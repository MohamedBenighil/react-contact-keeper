const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User =  require('../models/User')
const Contact = require('../models/Contact')
const { body, validationResult } = require('express-validator');

//@route /api/contacts
//@desc get all contacts
//@access Private
router.get('/', auth , async (req,res) =>{
    try {
        // contacts is array
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
        res.json(contacts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


//@route /api/contacts
//@desc insert contact
//@access Private

router.post('/', (req,res) =>{
    res.send('Contact insterted')
})

//@route /api/contacts
//@desc delete contact
//@access Private
router.delete('/:id', (req,res) =>{
    res.send('Contact delete')
})

//@route /api/contacts
//@desc update contact
//@access Private
router.put('/:id', (req,res) =>{
    res.send('Contact updated')
})

module.exports = router