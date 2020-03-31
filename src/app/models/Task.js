const { Model, DataTypes } = require('sequelize')

class Task extends Model {
    static init(connection) {
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                value: DataTypes.DECIMAL
            },
            {
                sequelize: connection,
            }
        )
    };

    static associate(models) {
        this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    }
};

module.exports = Task;
