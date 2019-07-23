'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    medic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userCreate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    },
    consultations: [{
        dateConsultation: {
            type: Date,
            required: true
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        status: {
            type: String,
            required: true,
            enum: ['created', 'done'],
            default: 'created'
        }
    }]
})

module.exports = mongoose.model('ConsultationMedic', schema);