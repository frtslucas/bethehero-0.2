const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs');

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
        });
    };
};

module.exports = User;

// const mongoose = require('../../database/connection');
// const bcrypt = require('bcryptjs')

// const UserSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },

//     lastName: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         unique: true,
//         required: true,
//         lowercase: true
//     },

//     password: {
//         type: String,
//         required: true,
//         select: false
//     },

//     passwordResetToken: {
//         type: String,
//         select: false
//     },

//     passwordResetExpiration: {
//         type: Date,
//         select: false
//     },

//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
// });

// UserSchema.pre('save', async function(next) {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;

//     next();
// });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;