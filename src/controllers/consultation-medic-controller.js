'use strict'
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/consultation-medic-repository');

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

    contract.isRequired(req.body.medic, 'O Médico é obrigatório');
    contract.isRequired(req.body.consultations, 'Deve conter pelo menos uma consulta');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Consulta cadastrada com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastrar consulta', data: e });
    }
}
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Consulta atualizada com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao atualizar consulta', data: e });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: 'Consulta deletada com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao deletar consulta', data: e });
    }
}