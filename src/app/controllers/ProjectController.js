const express = require('express');
const User = require('../models/User');
const Project = require('../models/Project');

module.exports = {
    async index (request, response) {
        const user_id = request.userId;

        const user = await User.findByPk(user_id, {
            include: { association: 'projects' }
        });

        return response.send(user.projects);
    },

    async create (request, response) {
        const { title, description } = request.body;
        const user_id = request.userId;

        console.log(user_id);

        const user = await User.findByPk(user_id);

        if (!user)
            return response.status(400).send({ error: 'User not found.' });

        const project = await Project.create({
            title,
            description,
            user_id
        });

        return response.send(project);
    }
}

// router.use(authMiddleware);

// router.get('/', async (request, response) => {
//     try {
//         const projects = await Project.find().populate(['user', 'tasks']);

//         return response.send({ projects });
    
//     } catch (err) {
//         return response.status(400).send({ error: 'Error loading projects.' });
//     }
// });

// router.get('/:projectId', async (request, response) => {
//     try {
//         const project = await Project.findById(request.params.projectId).populate(['user', 'tasks']);

//         return response.send({ project });
    
//     } catch (err) {
//         return response.status(400).send({ error: 'Error loading project.' });
//     }
// });

// router.post('/', async (request, response) => {
//     try {
//         const { title, description, tasks } = request.body;

//         const project = await Project.create({ title, description, user: request.userId });

//         await Promise.all(tasks.map(async task => {
//             const projectTask = new Task({ ...task, project: project._id });

//             await projectTask.save();

//             project.tasks.push(projectTask);
//         }));

//         await project.save();

//         return response.send({ project });

//     } catch (err) {
//         console.log(err);
//         return response.status(400).send({ error: 'Could not create a new project.' });
//     }
// });

// router.put('/:projectId', async (request, response) => {
//     try {
//         const { title, description, tasks } = request.body;

//         const project = await Project.findByIdAndUpdate(request.params.projectId, { 
//             title, 
//             description
//         }, { new: true });

//         project.tasks = [];

//         await Task.remove({ project: project._id });

//         await Promise.all(tasks.map(async task => {
//             const projectTask = new Task({ ...task, project: project._id });

//             await projectTask.save();

//             project.tasks.push(projectTask);
//         }));

//         await project.save();

//         return response.send({ project });

//     } catch (err) {
//         console.log(err);
//         return response.status(400).send({ error: 'Could not update the project.' });
//     }
//     });

// router.delete('/:projectId', async (request, response) => {
//     try {
//         await Project.findByIdAndRemove(request.params.projectId);

//         return response.send();
    
//     } catch (err) {
//         return response.status(400).send({ error: 'Error deleting project.' });
//     }
// });

// module.exports = (app) => app.use('/projects', router)