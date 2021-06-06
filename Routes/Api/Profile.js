const Router = require('express').Router();
const Order = require('../../model/Order');
const User = require('../../model/User');
const verifyUser = require('../auth/verifyUser');

Router.get('/', verifyUser, (req,res) => {
    User.findOne({email: req.header('email')}).then(response => {
        Order.find({email: response.email}).then(orders => {
            res.send({
                name: response.name,
                email: response.email,
                orders: orders
            });
        }).catch(err => {
            res.send("Something went Wrong");
        });
    }).catch(err => {
        console.log(err);
    })
});

module.exports = Router;