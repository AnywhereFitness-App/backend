const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/users-router');
const classesRouter = require('./classes/classes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/classes', classesRouter);

module.exports = server;