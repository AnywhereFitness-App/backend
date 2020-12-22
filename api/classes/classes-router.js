const express = require('express');

const router = express.Router();

const Class = require('./classes-model');

router.get('/', (req, res) => {
    Class.getAll()
})

router.get('/:id', (req, res) => {
    Class.getById(req.params.id)
})

module.exports = router;