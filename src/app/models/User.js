const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            password_reset_token: DataTypes.STRING,
            password_reset_expiration: DataTypes.DATE
        },
        {
            sequelize: connection,
        })
    };

    static associate(models) {
        this.hasMany(models.Project, { foreignKey: 'user_id', as: 'projects' });
    }
};

module.exports = User;
