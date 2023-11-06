const mongoose = require('mongoose')
const requestSchema = new mongoose.Schema({
    Name:{   
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    cpassword:{
        type: String,
        required: true
    },
})
const Request = new mongoose.model("Request",requestSchema)
module.exports = Request;