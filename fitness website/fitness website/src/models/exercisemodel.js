const mongoose = require("mongoose");
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    datess:{
        type: String,
        required: true,
    },
    timess:{
        type: String,
        required: true,
    },
    distance:{
        type:Number,
        required: true,
    },
    heartrate:{
        type:Number,
        required: true,
    },
    calories:{
        type:Number,    
        required: true,
    },
    notes:{
        type:String,
        required: true,
    }
})

const Exercise = new mongoose.model("Exercise",exerciseSchema)
module.exports = Exercise;