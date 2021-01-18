const mongoose = require('mongoose')

const conactSchema = mongoose.Schema({
    //one user can have multiple contacts
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    type:{
        type: String,
        default: 'personal'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Contact', conactSchema)