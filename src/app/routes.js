const express = require('express');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const TaskController = require('./controllers/TaskController');
const authMiddleware = require('./middlewares/authMiddleware');
const rolesMiddleware = require('./middlewares/rolesMiddleware');

const routes = express.Router();

routes.post('/user/register', UserController.register);
routes.post('/user/login', UserController.login);
routes.post('/user/forgot-password', UserController.forgotPassword);
routes.post('/user/reset-password', UserController.resetPassword);

routes.get('/projects', rolesMiddleware.allowIfLoggedIn, authMiddleware, ProjectController.index)
routes.post('/projects', authMiddleware, ProjectController.create)

routes.get('/projects/:project_id', authMiddleware, TaskController.index)
routes.post('/projects/:project_id/tasks', authMiddleware, TaskController.create)

module.exports = routes;