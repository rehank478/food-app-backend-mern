const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        max: 255
    },
    email: {
        type:String,
        required: true,
        max: 255,
        min: 6
    },
    password:{
        type:String,
        required: true,
        max: 1024,
        min: 6
    },
    cart: {
        items: [
            {
                id: String,
                name: String,
                description: String,
                price: Number,
                amount: Number
            }
        ],
        totalPrice: {
            type:Number,
            min: 0
        },
        numberOfItems: {
            type: Number,
            min: 0
        }
    },
});

module.exports = mongoose.model('User', userSchema);