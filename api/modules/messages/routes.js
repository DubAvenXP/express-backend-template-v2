const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const Model = require('./schema');
const { list, listOne, update, remove } = require('../network')(Model);
const { sendEmail } = require('../../helpers');

router.get('/', list);

router.get('/:id', [
    check('id', 'Invalid id').notEmpty().isMongoId(),
], listOne);

router.post('/', sendEmail);

router.put('/:id', [
    check('id', 'Invalid id').notEmpty().isMongoId(),
], update);

router.delete('/:id', [
    check('id', 'Invalid id').notEmpty().isMongoId(),
], remove);

module.exports = router;