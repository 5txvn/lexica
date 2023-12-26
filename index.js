//express and morgan setup
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/src"))

//socket.io setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//use dotenv
require('dotenv').config();

//use chalk for program logging
const chalk = require('chalk');

//set up sessions usage
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//connect to mongodb and import the user schema
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);
const User = require('./User')

//get array of user(s) that match a particular username
async function findUser(username) {
  const users = await User.find(
    { username: username }
  ).exec();
  return users
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/landing.html")
})

//set up the signup page
app.get('/sign-up', (req, res) => {
    console.log(chalk.blue("GET request made to /sign-up"))
    res.sendFile(__dirname + "/signup.html")
})

app.post('/sign-up', (req, res) => {
  const existingUsers = findUser(req.body.username)
  if (existingUsers.length == 0) {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email
    });
    async function createUser() {
      await user.save();
      console.log(user);
    }
    createUser()
  } else {

  }
})

app.listen(3000)