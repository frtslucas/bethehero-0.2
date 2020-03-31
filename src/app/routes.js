const express = require('express');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/register', SessionController.register);
routes.post('/login', SessionController.login);

module.exports = routes;