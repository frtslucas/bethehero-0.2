const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING(2),
            whatsapp: DataTypes.STRING(11),
            acess_token: DataTypes.STRING,
            role: DataTypes.ENUM('normal', 'ong'),
            password_reset_token: DataTypes.STRING,
            password_reset_expiration: DataTypes.DATE
        },
        {
            sequelize: connection,
        })
    };

    static associate(models) {

    }
};

module.exports = User;
