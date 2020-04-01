const express = require('express');
const router = express.Router();

// Controllers
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const ProjectController = require('./controllers/ProjectController');
const TaskController = require('./controllers/TaskController');

// Middlewares
const authMiddleware = require('./middlewares/authMiddleware');

router.post('/session/register', SessionController.registerUser);
router.post('/session/login', SessionController.loginUser);
router.post('/session/forgot-password', SessionController.forgotPassword);
router.post('/session/reset-password', SessionController.resetPassword);

router.get('/projects/', authMiddleware, ProjectController.indexProject);
router.get('/projects/:projectId', authMiddleware, ProjectController.showProject);
router.post('/projects/', authMiddleware, ProjectController.createProject);
router.put('/projects/:projectId', authMiddleware, ProjectController.updateProject);
router.delete('/projects/:projectId', authMiddleware, ProjectController.deleteProject);

router.get('/projects/:projectId/tasks', authMiddleware, TaskController.indexTask);
router.get('/projects/:projectId/tasks/:taskId', authMiddleware, TaskController.showTask);
router.post('/projects/:projectId/tasks', authMiddleware, TaskController.createTask);
router.put('/projects/:projectId/tasks/:taskId', authMiddleware, TaskController.updateTask);
router.delete('/projects/:projectId/tasks/:taskId', authMiddleware, TaskController.deleteTask);

module.exports = router;