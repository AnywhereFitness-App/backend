const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./../../config/secret');

const User = require('./users-model');
const Middleware = require('./users-middleware');


router.get('/', (req, res) => {
    User.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {
    User.getById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/register', Middleware.checkRegisterPayload, Middleware.emailUnique, (req, res) => {
    const credentials = req.body;

    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    User.create(credentials)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.post('/login', Middleware.checkLoginPayload, Middleware.emailExists, (req, res) => {
    const { email, password } = req.body;

    User.getByUser({ email: email })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = makeToken(user);
                res.status(200).json({
                    message: `Welcome, ${user.email}`,
                    token
                })
            } else {
                res.status(401).json({ message: 'invalid credentials' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    User.update(id, changes)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'no user with that id found' })
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', (req, res) => {
    User.remove(req.params.id)
        .then(deleted => {
            if(!deleted) {
                res.status(404),json({ message: 'no user with that id found' })
            } else {
                res.status(204).json({ message: 'user deleted' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

const makeToken = user => {
    const payload = {
        subject: user.id,
        email: user.email 
    };
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;