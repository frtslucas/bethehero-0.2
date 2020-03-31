const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig')

const User = require('../app/models/User')
const Ong = require('../app/models/Ong')
const Project = require('../app/models/Project')
const Task = require('../app/models/Task')

const connection = new Sequelize(dbConfig);

User.init(connection);
Ong.init(connection);
Project.init(connection);
Task.init(connection);

User.associate(connection.models);
Ong.associate(connection.models);
Project.associate(connection.models);
Task.associate(connection.models);

module.exports = connection;