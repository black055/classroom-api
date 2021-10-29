const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
});

module.exports = mongoose.model("users", Users);