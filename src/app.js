'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://denicarvalho:denicarvalho@cluster0-tpzyr.azure.mongodb.net/test?retryWrites=true&w=majority')

// Carrega models
const Patient = require('./models/patient-model');

//Carrega rotas
const indexRoute = require('./routes/index-route');
const patientRoute = require('./routes/patient-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/patient', patientRoute);

module.exports = app;