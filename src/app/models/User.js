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
        this.belongsToMany(models.Ong, { through: 'users_ongs', as: 'following' });
    }
};

module.exports = User;
