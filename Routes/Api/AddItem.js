const Router = require('express').Router();
const Item = require('../../model/Item');
const verifyAdmin = require('../auth/verifyAdmin');

Router.post('/', verifyAdmin, async (req,res) => {
    const itemExist = await Item.findOne({name: req.body.name});
    if(itemExist) res.send("Item already Exist");
    else{
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });
    
        try{
            const saveItem = await newItem.save();
            res.send("Item Added Successfully");
        }catch(err){
            res.send(err);
        }
    }
});

Router.get('/', (req,res) => {
    Item.find({}).then(response => {
        res.send(response);
    }).catch(err => {
        res.send(err);
    })
})


module.exports = Router;