'use strict'
const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');

exports.get = (req, res, next) => {
    Patient.find({ active: true }, 'id name sex birthDate').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
    Patient.findById(req.params.id, 'id name sex birthDate rg cpf dateInclusion').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByName = (req, res, next) => {
    Patient.find({ name: new RegExp(req.params.name, 'i'), active: true }, 'id name sex birthDate rg cpf dateInclusion').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}


exports.post = (req, res, next) => {
    let patient = new Patient(req.body);
    patient.save().then(p => {
        res.status(201).send({ message: 'Paciente cadastrado com sucesso!' });
    }).catch(e => {
        res.status(400).send({ message: 'Erro ao cadastra paciente', data: e });
    });

}
exports.put = (req, res, next) => {
    Patient.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            rg: req.body.rg,
            cpf: req.body.cpf,
            sex: req.body.sex,
            birthDate: req.body.birthDate
        }
    }).then(data => {
        res.status(200).send({ message: 'Paciente atualizado com sucesso' });
    }).catch(e => {
        res.status(400).send({ message: 'Erro ao atualizar paciente', data: e });
    })
};

exports.delete = (req, res, next) => {
    Patient.findOneAndRemove(req.params.id).then(data => {
        res.status(200).send({ message: 'Paciente deletado com sucesso' });
    }).catch(e => {
        res.status(400).send({ message: 'Erro ao deletar paciente', data: e });
    })
}