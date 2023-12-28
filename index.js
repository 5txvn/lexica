//express and morgan setup
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/src"))
app.use(express.static(__dirname + "/assets"))

//socket.io setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//connect to socket.io
io.on("connection", (socket) => {
  console.log("connected")
})

//import (other) libraries
const bcrypt = require('bcrypt');
const chalk = require('chalk')
require('dotenv').config();

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

//home page (get request)
app.get('/', (req, res) => {
  if (req.session.username) {
    res.sendFile(__dirname + "/landing.html")
  } else {
    res.sendFile(__dirname + "/signup.html")
  }
})

//set up the signup page
app.get('/sign-up', (req, res) => {
    console.log(chalk.blue("GET request made to signup page"))
    res.sendFile(__dirname + "/signup.html")
})

//post request for signup page
app.post('/sign-up', (req, res) => {
  findUser(req.body.username).then(existingUsers => {
    console.log(existingUsers)
    const salt = bcrypt.genSaltSync(10);
    if (existingUsers.length == 0) {
      //create schema with user data
      const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        name: req.body.name,
        email: req.body.email
      });
      //create the user in the database
      async function createUser() {
        await user.save();
        console.log(user);
      }
      createUser()
      //set up the stuff w sessions (figure out how to simplify this code later down the line)
      req.session.username = req.body.username
      req.session.password = req.body.password
      req.session.name = req.body.name
      req.session.email = req.session.email
    } else {
      //res.sendFile(__dirname + "/signup.html")
      io.emit("username_fail")
    }
  })
})

//set up the login page
app.get('/login', (req, res) => {
  console.log(chalk.blue("GET request made to login page"))
  res.sendFile(__dirname + "/login.html")
})

app.post('/login', (req, res) => {
  findUser(req.body.username).then(existingUsers => {
    if (existingUsers.length == 0) {
      res.redirect("/login?1")
    } else if (!bcrypt.compareSync(req.body.password, existingUsers[0].password)) {
      res.redirect("/login?2")
    } else {
      res.send("success!")
    }
  })
  //bcrypt.compareSync("B4c0/\/", hash)
})

server.listen(3000)