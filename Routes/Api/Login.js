const Router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require('../../model/User');
const jwt = require('jsonwebtoken');

// Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});


Router.route("/")
.post((req,res) => {
    
    const error = schema.validate(req.body).error;
    
    if(error != undefined) res.send(error.details[0].message);

    User.findOne({email: req.body.email}).then(response => {
        // console.log(response);
        const user = response;
        if(!user) res.send("Email Not Exist");
    
        bcrypt.compare(req.body.password, user.password).then(response => {
            if(response){
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

                res.send({token: token});
            }else{
                res.send("Invalid Password");
            }
        }).catch(err => {
            res.send(err);
        })
    

        
    }).catch(err => {
        res.send(err);
    });
    
});


module.exports = Router;