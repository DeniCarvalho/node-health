'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rg: {
        type: Number,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    sex: {
        type: Number,
        required: true
    },
    birthDate: {
        type: Date,
        required: true,
        min: '1700-01-01',
    },
    dateInclusion: {
        type: Date,
        required: true,
        default: new Date()
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Patient', schema);