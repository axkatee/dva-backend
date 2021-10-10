const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const Appointment = new Schema({
    name: String,
    doctor: String,
    date: String,
    complaint: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Appointment', Appointment);