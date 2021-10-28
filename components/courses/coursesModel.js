const mongoose = require('mongoose');

const Courses = new mongoose.Schema({
    courseName: String,
    courseID: String,
    courseDesc: String
});

module.exports = mongoose.model("courses", Courses);