'use strict'

const config = require('../config');
// const sendgrid = require('sendgrid')(config.sendGridKey);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendGridKey);

exports.send = async (to, subject, body) => {
    sgMail.send({
        to: to,
        from: 'denii.carvalho94@gmail.com',
        subject: subject,
        html: body
    })
}