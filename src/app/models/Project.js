const { Model, DataTypes } = require('sequelize')

class Project extends Model {
    static init(connection) {
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        )
    };

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
        this.hasMany(models.Task, { foreignKey: 'project_id', as: 'tasks_owned' });
    }
};

module.exports = Project;
