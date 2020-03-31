const express = require('express');
const UserController = require('./controllers/UserController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const ProjectController = require('./controllers/ProjectController');
const TaskController = require('./controllers/TaskController');
const authMiddleware = require('./middlewares/authMiddleware');

const routes = express.Router();

routes.post('/user/register', UserController.register);
routes.post('/user/login', UserController.login);
routes.post('/user/forgot-password', UserController.forgotPassword);
routes.post('/user/reset-password', UserController.resetPassword);

routes.post('/ong/register', OngController.register);
routes.post('/ong/login', OngController.login);
routes.post('/ong/forgot-password', OngController.forgotPassword);
routes.post('/ong/reset-password', OngController.resetPassword);

routes.get('/profile', authMiddleware, ProfileController.index);

routes.get('/projects', authMiddleware, ProjectController.index)
routes.post('/projects', authMiddleware, ProjectController.create)

routes.get('/projects/:project_id', authMiddleware, TaskController.index)
routes.post('/projects/:project_id/tasks', authMiddleware, TaskController.create)

module.exports = routes;