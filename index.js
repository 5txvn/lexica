const express = require('express');
const app = express();

//set up the signup page
app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})