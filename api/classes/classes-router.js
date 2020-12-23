const express = require('express');

const router = express.Router();

const Class = require('./classes-model');

const checkReqBody = (req, res, next) => {

}

router.get('/', (req, res) => {
    Class.getAll()
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.get('/:id', (req, res) => {
    Class.getById(req.params.id)
        .then(fitnessClass => {
            if(!fitnessClass) {
                res.status(404).json({ message: 'no class with that id found' })
            } else {
                res.status(200).json(fitnessClass);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.post('/', (req, res) => {
    Class.create(req.body)
        .then()
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {
    
})

module.exports = router;