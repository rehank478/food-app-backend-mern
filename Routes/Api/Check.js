const Router = require('express').Router();
const bcrypt = require("bcrypt");
const verifyUser = require('../auth/verifyUser');


Router.get("/", verifyUser, (req,res) => {
    res.send(true);
})


module.exports = Router;