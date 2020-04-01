const Task = require('../models/Task');
const Project = require('../models/Project');

module.exports = {
    async indexTask(request, response) {
        try {
            const tasks = await Task.find({ project: request.params.projectId }).populate(['project', 'assignedTo']);
    
            return response.send({ tasks });
        
        } catch (err) {
            return response.status(400).send({ error: 'Error loading tasks.' });
        }
    },
    
    async showTask(request, response) {
        try {
            const task = await Task.findById(request.params.taskId).populate(['project', 'assignedTo']);
    
            return response.send({ task });
        
        } catch (err) {
            return response.status(400).send({ error: 'Error loading task.' });
        }
    },
    
    async createTask(request, response) {
        try {
            const { title, description, value } = request.body;
            const projectId = request.params.projectId;

            const task = await Task.create({ title, description, value, project: projectId, assignedTo: request.userId });
            await task.save();

            await Project.findByIdAndUpdate(projectId, {
                $push: { tasks: task._id }
            });

            return response.status(200).send(task);

        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Could not create a new task.' });
        }
    },
    
    async updateTask(request, response) {
        try {
            const { title, description, value } = request.body;
    
            const task = await Task.findByIdAndUpdate(request.params.taskId, { 
                title, 
                description,
                value
            }, { new: true });
    
            await task.save();
    
            return response.send({ task });
    
        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Could not update the project.' });
        }
    },
    
    async deleteTask(request, response) {
        try {
            const task = await Task.findById(request.params.taskId);
            task.remove();

            await Project.findByIdAndUpdate(request.params.projectId, {
                $pull: { tasks: task._id }
            })
    
            return response.send({ msg: 'Task deleted:', task });
        
        } catch (err) {
            return response.status(400).send({ error: 'Error deleting project.' });
        }
    }
    
};

