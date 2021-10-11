const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const mongoose = require('mongoose');
const jwtMiddleware = require('../dva-backend/middlewares/jwt_middleware');
const url = 'mongodb+srv://user:user@cluster.gvlln.mongodb.net/doctor-database?retryWrites=true&w=majority';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/home', jwtMiddleware.jwtValidate, appointmentRoutes);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req,res,next) => {
    console.log("request log", req.url);
    next();
})

async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log('App listen on PORT', PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

start().then();
