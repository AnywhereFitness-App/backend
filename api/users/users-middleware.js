const User = require('./users-model');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./../../config/secret');

const checkRegisterPayload = (req, res, next) => {
    if(!req.body.email || !req.body.password || !req.body.role) {
        res.status(400).json({ message: 'email, password, and role required' })
    } else {
        next();
    }
}

const checkLoginPayload = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).json({ message: 'email and password required' })
    } else {
        next();
    }
}

const emailUnique = async (req, res, next) => {
    try {
        const rows = await User.getByUser({ email: req.body.email })
        if(!rows.length) {
            next()
        } else {
            res.status(400).json({ message: 'email already taken' })
        }
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const emailExists = async (req, res, next) => {
    try {
        const rows = await User.getByUser({ email: req.body.email })
        if(rows.length) {
            next()
        } else {
            res.status(400).json({ message: 'email does not exist' })
        }
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({ message: 'token required' })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({ message: 'token invalid' })
            } else {
                req.decodedToken = decoded;
                next();
            }
        })
    }
}

module.exports = {
    checkRegisterPayload,
    checkLoginPayload,
    emailUnique,
    emailExists,
    restricted
}