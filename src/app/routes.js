const express = require('express');
const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const ProjectController = require('./controllers/ProjectController');
const TaskController = require('./controllers/TaskController');
const authMiddleware = require('./middlewares/authMiddleware');

const routes = express.Router();

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.post('/forgot-password', UserController.forgotPassword);
routes.post('/reset-password', UserController.resetPassword);

routes.use(authMiddleware);

routes.get('/profile', ProfileController.index);

routes.get('/projects', ProjectController.index)
routes.post('/projects', ProjectController.create)

routes.get('/projects/:project_id', TaskController.index)
routes.post('/projects/:project_id/tasks', TaskController.create)

module.exports = routes;