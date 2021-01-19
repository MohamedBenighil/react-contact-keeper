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


router.post('/',auth, 
// validation of name & email
body('name','Name is required').not().isEmpty(),
body('email','Email is required').isEmail(),
async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, user,phone, type} = req.body
    // notice we have to pass user attribute
    const newContact = Contact({ name, user, phone, type, user: req.user.id})
    try {
        //notice contact object
        const contact = await newContact.save()
        res.json({contact})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


//@route /api/contacts
//@desc update contact
//@access Private
router.put('/:id', auth ,async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    try {
        //is contact with that id exists ?
        let contact = await Contact.findById(req.params.id)
        //no
        if(!contact){
            res.status(404).json({msg: "Contact not found"})
        }
        // yes
        // but is it belongs to that user ?
        // no
        if(contact.user.toString()!== req.user.id){
            res.status(401).json({msg: "No authorization"})
        }
        //yes
        //get the fields
        const {name, type,phone, email} = req.body
        //create object with that fields
        const contactFields = {}
        if (name) contactFields.name = name
        if (email) contactFields.email = email
        if (phone) contactFields.phone = phone
        if (type) contactFields.type = type
        //update the db        
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true})
        res.json(contact)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


//@route /api/contacts
//@desc delete contact
//@access Private
router.delete('/:id', auth, async (req,res) =>{
    try {
        //is contact with that id exists ?
        let contact = await Contact.findById(req.params.id)
        //no
        if(!contact){
            res.status(404).json({msg: "Contact not found"})
        }
        // yes
        // but is it belongs to that user ?
        // no
        if(contact.user.toString()!== req.user.id){
            res.status(401).json({msg: "No authorization"})
        }
        //yes
        //delete it 
        contact = await Contact.findByIdAndRemove(req.params.id)
        res.json({msg: "Contact removed"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
        
})



module.exports = router