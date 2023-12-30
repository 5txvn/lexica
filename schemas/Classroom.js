const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
    owner: String,
    classCode: String,
    dateCreater: String,
    sets: {}
})

module.exports = mongoose.model("Classroom", classroomSchema);