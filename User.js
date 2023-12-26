const mongoose = require("mongoose");

//user schema (will likely edit later)
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String
})

module.exports = mongoose.model("User", userSchema);