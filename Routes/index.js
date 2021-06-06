const express = require("express");
const Router = express.Router();


Router.use('/', require('./Api/Home'));
Router.use('/register', require('./Api/Register'));
Router.use('/login', require('./Api/Login'));
Router.use('/check', require('./Api/Check'));
Router.use('/cart', require('./Api/Cart'));
Router.use('/order', require('./Api/Order'));
Router.use('/profile', require('./Api/Profile'));
Router.use('/registerAdmin', require('./Api/RegisterAdmin'));
Router.use('/checkAdmin', require('./Api/CheckAdmin'));
Router.use('/isAdmin', require('./Api/IsAdmin'));
Router.use('/addItem', require('./Api/AddItem'));

module.exports = Router;