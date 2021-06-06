const Cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(Cors());
// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser: true, useUnifiedTopology: true }, 
() => {
    console.log("Connected to DB");
});


app.use(express.urlencoded({ extended: true }));
app.use(require('./Routes'));


app.listen(8001, () => {
    console.log("Server is up and running on port 8001");
})