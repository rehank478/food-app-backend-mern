const Router = require('express').Router();
const User = require('../../model/User');
const bcrypt = require("bcrypt");

// Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});


Router.route('/')
.post(async (req,res) => {
    // console.log(req.body);
    const error = await schema.validate(req.body).error;
    // res.send(validation);
    if(error != undefined) res.send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) res.send("Email already Exist");


    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        cart: {
            items: [],
            totalPrice: 0,
            numberOfItems: 0
        }
    });
    try{
        if(error === undefined){
            const savedUser = await user.save();
            res.send({
                user: savedUser._id
            });
        }
        
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = Router;