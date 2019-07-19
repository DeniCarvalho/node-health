'use strict'
const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/patient-repository');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getByName = async (req, res, next) => {
    try {
        let data = await repository.getByName(req.params.name);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMaxLen(req.body.name, 100, 'O Nome excedeu o tamanho limite');
    contract.isRequired(req.body.name, 'O Nome é obrigatório');

    contract.isRequired(req.body.rg, 'O RG é obrigatório');
    contract.isRequired(req.body.cpf, 'O CPF é obrigatório');
    contract.isRequired(req.body.sex, 'O campo Sexo é obrigatório');
    contract.isRequired(req.body.birthDate, 'A Data de Nascimento é obrigatório');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Paciente cadastrado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastra paciente', data: e });
    }
}
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Paciente atualizado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao atualizar paciente', data: e });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: 'Paciente deletado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao deletar paciente', data: e });
    }
}