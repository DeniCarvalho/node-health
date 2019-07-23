'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString)

// Carrega models
const Patient = require('./models/patient-model');
const User = require('./models/user-model');
const ConsultationMedic = require('./models/consultation-medic-model');

//Carrega rotas
const indexRoute = require('./routes/index-route');
const patientRoute = require('./routes/patient-route');
const userRoute = require('./routes/user-route');
const consultationMedicRoute = require('./routes/consultation-medic-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/patient', patientRoute);
app.use('/user', userRoute);
app.use('/consultation', consultationMedicRoute);

module.exports = app;