const verifyUser = require('../auth/verifyUser');
const Router = require('express').Router();
const User = require('../../model/User');
const Order = require('../../model/Order');

// Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email(),
    mobile: Joi.number().min(10).required(),
    street: Joi.string().min(6).required(),
    city: Joi.string().min(2).required(),
    postalCode: Joi.number().min(6).required(),
});


Router.post('/', verifyUser, async (req,res) => {
    const error = schema.validate(req.body).error;
    if(error != undefined) res.send(error.details[0].message);
    const userData = await User.findOne({email: req.body.email});
    try{
        const data = userData.cart;
        const newOrder = new Order({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            address: {
                street: req.body.street,
                postalCode: req.body.postalCode,
                city: req.body.city
            },
            cart: data
        });
        try{
            const details = await newOrder.save();
            res.send(details);
        }catch(err){
            res.send(err);
        }

        
    }catch(err){
        res.send(err);
    }
    
});


module.exports = Router;
