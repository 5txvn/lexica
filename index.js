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
const User = require('./schemas/User')
const Classroom = require("./schemas/Classroom")

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
    res.sendFile(__dirname + "/src/html/home.html")
    console.log(req.session.username)
    console.log(req.session.name)
    console.log(req.session.email)
  } else {
    req.session.username = "stxvn"
    console.log(req.session.username)
    res.sendFile(__dirname + "/src/html/landing.html")
  }
})

//set up the signup page
app.get('/sign-up', (req, res) => {
    console.log(chalk.blue("GET request made to signup page"))
    res.sendFile(__dirname + "/src/html/signup.html")
})

//post request for signup page
app.post('/sign-up', (req, res) => {
  if (req.body.password.length < 8) {
    res.redirect("/sign-up?1")
  } else if (!(/\d/.test(req.body.password))) {
    res.redirect("/sign-up?2")
  } else if (req.body.password == req.body.password.toLowerCase()) {
    res.redirect("/sign-up?3")
  } else {
    findUser(req.body.username).then(existingUsers => {
      console.log(existingUsers)
      const salt = bcrypt.genSaltSync(10);
      if (existingUsers.length == 0) {
        //create schema with user data
        const user = new User({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, salt),
          name: req.body.name,
          email: req.body.email,
          classes: [],
          admin: false
        });
        //create the user in the database
        async function createUser() {
          await user.save();
          console.log(`User ${req.body.username} was created`)
        }
        createUser()
        //set up the stuff w sessions (figure out how to simplify this code later down the line)
        req.session.username = req.body.username
        req.session.name = req.body.name
        req.session.email = req.session.email
      } else {
        res.redirect("/sign-up?4")
      }
    })
  }
})

//set up the login page
app.get('/login', (req, res) => {
  console.log(chalk.blue("GET request made to login page"))
  res.sendFile(__dirname + "/src/html/login.html")
})

app.post('/login', (req, res) => {
  findUser(req.body.username).then(existingUsers => {
    if (existingUsers.length == 0) {
      res.redirect("/login?1")
    } else if (!bcrypt.compareSync(req.body.password, existingUsers[0].password)) {
      res.redirect("/login?2")
    } else {
      res.send("success!")
      req.session.username = req.body.username
      findUser(req.body.username).then(existingUsers => {
        req.session.email = existingUsers[0].email
        req.session.name = existingUsers[0].name
      })
    }
  })
})

//TEMPORARY, REMOVE LATER
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/src/html/home.html")
})

app.get("/create-classroom", (req, res) => {
  if (req.session.username) {
    res.sendFile(__dirname + "/src/html/create-classroom.html")
  } else {
    res.redirect("/")
  }
})

app.post("/create-classroom", (req, res) => {
  //add later
})


server.listen(3000)