const express = require('express');

const router = express.Router();

const Class = require('./classes-model');

const checkReqBody = (req, res, next) => {
    if(!req.body.name || !req.body.type || !req.body.start_time || !req.body.duration || !req.body.intensity_level || !req.body.location || !req.body.registered_attendees || !req.body.max_class_size) {
        res.status(400).json({ message: 'missing required fields' });
    } else {
        next();
    }
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

router.post('/', checkReqBody, (req, res) => {
    Class.create(req.body)
        .then(fitnessClass => {
            res.status(201).json(fitnessClass);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.put('/:id', checkReqBody, (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Class.update(id, changes) 
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

router.delete('/:id', (req, res) => {
    Class.remove(req.params.id)
        .then(deleted => {
            if(!deleted) {
                res.status(404).json({ message: 'no class with that id found' })
            } else {
                res.status(204).json({ message: 'class deleted' });
            }    
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

module.exports = router;