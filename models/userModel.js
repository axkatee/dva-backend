const {Schema, model} = require('mongoose');

const User = new Schema({
    email: String,
    password: String,
})

module.exports = model('User', User);