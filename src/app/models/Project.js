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
    }
};

module.exports = Project;
