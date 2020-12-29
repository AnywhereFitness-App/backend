const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Middleware = require('./users/users-middleware');

const usersRouter = require('./users/users-router');
const classesRouter = require('./classes/classes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/classes', Middleware.restricted, classesRouter); 

module.exports = server;