const express = require("express");
const Router = express.Router();

Router.route('/')
.get((req,res) => {
    res.json("hey");
});

module.exports = Router;