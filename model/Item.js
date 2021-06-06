const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        max: 255
    },
    description: {
        type:String,
        required: true,
        min: 6
    },
    price:{
        type:Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('Item', itemSchema);