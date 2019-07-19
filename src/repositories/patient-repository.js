'use strict'
const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');

exports.get = async () => {
    return await Patient.find({ active: true }, 'id name sex birthDate');
};

exports.getById = async (id) => {
    return await Patient.findById(id, 'id name sex birthDate rg cpf dateInclusion')
}

exports.getByName = async (name) => {
    return await Patient.find({ name: new RegExp(name, 'i'), active: true }, 'id name sex birthDate rg cpf dateInclusion')
}

exports.create = async (data) => {
    let patient = new Patient(data);
    await patient.save();
}

exports.update = async (id, data) => {
    await Patient.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            rg: data.rg,
            cpf: data.cpf,
            sex: data.sex,
            birthDate: data.birthDate
        }
    });
}
exports.delete = async (id) => {
    await Patient.findByIdAndRemove(id);
}