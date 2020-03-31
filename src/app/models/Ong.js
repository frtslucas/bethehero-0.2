const { Model, DataTypes } = require('sequelize')

class Ong extends Model {
    static init(connection) {
        super.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            whatsapp: DataTypes.STRING(11),
            city: DataTypes.STRING,
            state: DataTypes.STRING(2),
            password_reset_token: DataTypes.STRING,
            password_reset_expiration: DataTypes.DATE
        },
        {
            sequelize: connection,
        })
    };

    static associate(models) {
        this.hasMany(models.Project, { foreignKey: 'ong_id', as: 'projects' });
        this.belongsToMany(models.User, { through: 'users_ongs', as: 'followers' });
    }
};

module.exports = Ong;
