const verifyUser = require('../auth/verifyUser');
const User = require('../../model/User');

const Router = require('express').Router();

Router.get('/', verifyUser, async (req,res) => {
    const user = await User.findOne({email: req.header('email')});
    try{
        const data = user.cart;
        res.send(data);
    }catch(err){
        console.log(err);
    }
});

Router.post('/', verifyUser , async (req,res) => {
    // console.log(req);
    const newItems = await JSON.parse(req.body.newItem);
    // console.log(newItems);
    await User.updateOne({email: req.body.email}, {$set: {
        "cart.totalPrice": newItems.totalPrice, 
        "cart.numberOfItems": newItems.numberOfItems,
        "cart.items": newItems.items
    }}).then(response => {
        res.send(true);
    }).catch(err => {
        console.log("err");
    });
    
});


module.exports = Router;