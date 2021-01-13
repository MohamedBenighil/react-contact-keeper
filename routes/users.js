const express = require("express")
const router = express.Router()


// @route /api/users
// @desc Register a user
// @access Public
router.post('/',(req,res) => {
    res.send("User regestred")
})

module.exports = router