'use strict'
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.get = async () => {
    return await User.find({ active: true }, 'id name email role');
};

exports.getById = async (id) => {
    return await User.findById(id, 'id name email role')
}

exports.getByName = async (name) => {
    return await User.find({ name: new RegExp(name, 'i'), active: true }, 'id name email role')
}

exports.create = async (data) => {
    let user = new User(data);
    await user.save();
}

exports.update = async (id, data) => {
    await User.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            role: data.role
        }
    });
}
exports.delete = async (id) => {
    await User.findByIdAndRemove(id);
}