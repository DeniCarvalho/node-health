'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Health API",
        version: process.env.npm_package_version
    })
});

module.exports = router;