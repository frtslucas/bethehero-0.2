const express = require('express');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const authMiddleware = require('./middlewares/authMiddleware');

const routes = express.Router();

routes.post('/register', SessionController.register);
routes.post('/login', SessionController.login);
routes.post('/forgot-password', SessionController.forgotPassword);
routes.post('/reset-password', SessionController.resetPassword);

routes.use(authMiddleware);

routes.get('/profile', ProfileController.index);

module.exports = routes;