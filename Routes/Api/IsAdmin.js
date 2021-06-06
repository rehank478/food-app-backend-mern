const Router = require('express').Router();
const bcrypt = require("bcrypt");
const verifyAdmin = require('../auth/verifyAdmin');


Router.get("/", verifyAdmin, (req,res) => {
    res.send(true);
})


module.exports = Router;