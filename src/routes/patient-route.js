'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/patient-controller')

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/name/:name', controller.getByName);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;