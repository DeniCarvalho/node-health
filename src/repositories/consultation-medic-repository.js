'use strict'
const mongoose = require('mongoose');
const ConsultationMedic = mongoose.model('ConsultationMedic');

exports.get = async () => {
    return await ConsultationMedic.find({}).populate('medic', '_id name email').populate('userCreate', '_id name email role').populate('consultations.patient', '_id name cpf sex');
};

exports.getById = async (id) => {
    return await ConsultationMedic.findById(id)
}

exports.getByName = async (name) => {
    return await ConsultationMedic.find({ name: new RegExp(name, 'i'), active: true })
}

exports.create = async (data) => {
    let consultationMedic = new ConsultationMedic(data);
    await consultationMedic.save();
}

exports.update = async (id, data) => {
    await ConsultationMedic.findByIdAndUpdate(id, {
        $set: {
            medic: data.medic,
            consultations: data.consultations
        }
    });
}
exports.delete = async (id) => {
    await ConsultationMedic.findByIdAndRemove(id);
}