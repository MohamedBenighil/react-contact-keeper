const express = require('express')
const router = express.Router()

//@route /api/contacts
//@desc insert contact
//@access Private

router.post('/', (req,res) =>{
    res.send('Contact insterted')
})

//@route /api/contacts
//@desc get all contacts
//@access Private
router.get('/', (req,res) =>{
    res.send('get all contacts')
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