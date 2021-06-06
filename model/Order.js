const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
    address:{
        street: String,
        postalCode: Number,
        city: String
    },
    mobile:{
        type: Number,
        required: true,
        min: 10,
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

module.exports = mongoose.model('Order', orderSchema);