const express = require('express');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const ProjectController = require('./controllers/ProjectController');
const TaskController = require('./controllers/TaskController');
const authMiddleware = require('./middlewares/authMiddleware');

const routes = express.Router();

routes.post('/register', SessionController.register);
routes.post('/login', SessionController.login);
routes.post('/forgot-password', SessionController.forgotPassword);
routes.post('/reset-password', SessionController.resetPassword);

routes.use(authMiddleware);

routes.get('/profile', ProfileController.index);

routes.get('/projects', ProjectController.index)
routes.post('/projects', ProjectController.create)

routes.get('/projects/:project_id', TaskController.index)
routes.post('/projects/:project_id/tasks', TaskController.create)

module.exports = routes;