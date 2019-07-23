'use strict'
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');

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

    contract.isRequired(req.body.email, 'O Email é obrigatório');
    contract.isEmail(req.body.email, 'Email incorreto');

    contract.isRequired(req.body.password, 'A Senha é obrigatória');
    contract.hasMinLen(req.body.password, 6, 'A Senha deve conter pelo menos 6 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastra usuário', data: e });
    }
}
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao atualizar usuário', data: e });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao deletar usuário', data: e });
    }
}