const express = require('express');
const { check } = require('express-validator');

const {encriptPassword} = require('./middlewares')

const router = express.Router();

// const { populateData } = require('../../middlewares');

const Model = require('./schema');
const { list, listOne, add, update, remove } = require('../../Controller')(Model);

// router.get('/', [populateData(['role', 'department'])], list);

router.get('/', list);

router.get('/:id', [
    check('id', 'Invalid id').notEmpty().isMongoId(),
], listOne);

router.post('/', [
    // encriptPassword,
], add);

router.put('/:id', [
    check('id', 'Invalid id').notEmpty().isMongoId(),
], update);

router.delete('/:id', [
    check('id', 'Invalid id').notEmpty().isMongoId(),
], remove);


module.exports = router;