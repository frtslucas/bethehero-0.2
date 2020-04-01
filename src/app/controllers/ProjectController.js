const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {
    async indexProject(request, response) {
        try {
            const projects = await Project.find().populate(['owner', 'tasks']);
    
            return response.send({ projects });
        
        } catch (err) {
            return response.status(400).send({ error: 'Error loading projects.' });
        }
    },
    
    async showProject(request, response) {
        try {
            const project = await Project.findById(request.params.projectId).populate(['owner', 'tasks']);
    
            return response.send({ project });
        
        } catch (err) {
            return response.status(400).send({ error: 'Error loading project.' });
        }
    },
    
    async createProject(request, response) {
        try {
            const { title, description } = request.body;

            const project = await Project.create({ title, description, owner: request.userId });
            await project.save();

            await User.findByIdAndUpdate({ _id: request.userId }, {
                $push: { projects: project._id } 
            });

            return response.status(200).send(project);
        
        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Could not create a new project.' });
        }
    },
    
    async updateProject(request, response) {
        try {
            const { title, description } = request.body;
    
            const project = await Project.findByIdAndUpdate(request.params.projectId, { 
                title, 
                description
            }, { new: true });
    
            await project.save();
    
            return response.send({ project });
    
        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Could not update the project.' });
        }
    },
    
    async deleteProject(request, response) {
        try {
            const project = await Project.findById(request.params.projectId);
            project.remove();

            await User.findByIdAndUpdate({ _id: request.userId }, {
                $pull: { projects: project._id } 
            })

            await Task.deleteMany({ project: request.params.projectId });
    
            return response.send({ msg: 'Project deleted:', project });
        
        } catch (err) {
            return response.status(400).send({ error: 'Error deleting project.' });
        }
    }
    
};

