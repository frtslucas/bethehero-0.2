const express = require('express');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/register', SessionController.register);
routes.post('/login', SessionController.login);
routes.post('/forgot-password', SessionController.forgotPassword);
routes.post('/reset-password', SessionController.resetPassword);

module.exports = routes;