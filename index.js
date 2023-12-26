//express and bodyparser setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')

//use dotenv
require('dotenv').config();

//set up sessions usage
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//set up the signup page
app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/sign-up', (req, res) => {

})