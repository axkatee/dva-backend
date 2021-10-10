const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");

module.exports.add = async (req, res) => {
    try {
        const params = req.body;
        if (!params || !params.name || !params.doctor || !params.date || !params.complaint) {
            return res.status(400).send({ message: 'incorrect schema' });
        }
        const data = {
            name: params.name,
            doctor: params.doctor,
            date: params.date,
            complaint: params.complaint,
            createdBy: mongoose.Types.ObjectId(req.user._id)
        }
        const createResponse = await Appointment.create(data);
        return res.status(200).send(createResponse);
    } catch (e) {
        console.log(`error with adding new data ${e}`)
        return res.status(500).send({ message: e });
    }
}

module.exports.update = async (req, res) => {
    try {
        const params = req.body;
        const entry = {
            name: params.name,
            doctor: params.doctor,
            date: params.date,
            complaint: params.complaint
        }
        if (!params || !params._id) {
            return res.status(400).send({ message: "No id" });
        }
        await Appointment.findOneAndUpdate({ _id: params._id }, entry)
        return res.status(200).send({ message: 'Successfully updated item' })
    } catch (e) {
        console.log('error with updating entry ', e)
        return res.status(500).send({ message: e });
    }
}

module.exports.delete = async (req, res) => {
    try {
        const params = req.body;
        if (!params || !params._id) {
            return res.status(400).send({ message: "No id" });
        }
        await Appointment.findOneAndDelete({ _id: params._id });
        return res.status(200).send({ message: 'Successfully deleted item' })
    } catch (e) {
        console.log('error with deleting entry ', e);
        return res.status(500).send({ message: e });
    }
}

module.exports.allAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ createdBy: req.user._id })
        return res.status(200).send({ appointments });
    } catch (e) {
        console.log('error with getting all appointments ', e)
        return res.status(500).send(e);
    }
}
