const express = require('express')
const router = express.Router()


// @route /api/auths
// @desc Loign a user
// @access Public
router.post('/',(req, res) => {
    res.send('Login user')
})

// @route /api/auths
// @desc Get logged in a user
// @access Private
router.get('/', (req, res) => {
    res.send('Get logged user')
})

module.exports = router