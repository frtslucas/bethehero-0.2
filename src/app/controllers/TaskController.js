const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {
    async index (request, response) {
        const { project_id } = request.params;

        console.log(project_id, typeof(project_id));

        const project = await Project.findByPk(project_id, {
            include: { association: 'tasks_owned' }
        });

        return response.send(project);
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        const { project_id } = request.params;

        const project = await Project.findByPk(project_id);

        if (!project)
            return response.status(400).send({ error: 'Project not found.' });

        const task = await Task.create({
            title,
            description,
            value,
            project_id
        });

        return response.send(task);
    }
}