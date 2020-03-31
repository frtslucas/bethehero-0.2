const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/authConfig.json');
const mailer = require('../../modules/mailer');
const Ong = require('../models/Ong');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
};

async function hashPassword(password) {
    return await bcrypt.hash(password, 2);
};

module.exports = {
    async register (request, response) {
        const { email, password } = request.body;

        try {
            if (await Ong.findOne({ where: {email} }))
                return response.status(400).send({ error: 'Email is already registered.' });

            const hash = await hashPassword(password);

            const ong = await Ong.create(
                Object.assign(request.body, { password: hash })
              );

            ong.password = undefined;
            ong.password_reset_token = undefined;
            ong.password_reset_expiration = undefined;

            return response.send({ 
                ong,
                token: generateToken({ id: ong.id })
            }).header('Is Ong', true);

        } catch (err) {
            return response.status(400).send({ error: 'Registration failed.' });
        }
    },

    async login (request, response) {
        const { email, password } = request.body;
        
        const ong = await Ong.findOne({ where: {email} })

        if (!ong)
            return response.status(400).send({ error: 'Ong not found.' });
        
        if (! await bcrypt.compare(password, ong.dataValues.password))
            return response.status(400).send({ error: 'Invalid password.' });
    
        ong.password = undefined;
        ong.password_reset_token = undefined;
        ong.password_reset_expiration = undefined;
        
        response.header('X-Is-Ong', 'true');
        response.send({ 
            ong, 
            token: generateToken({ id: ong.id }),
        })
    },

    async forgotPassword (request, response) {
        const { email } = request.body;
    
        try {
            const ong = await Ong.findOne({ email });
    
            if (!ong)
                return response.status(400).send({ error: 'Ong not found.' });
    
            const token = crypto.randomBytes(20).toString('hex');
    
            const now = new Date();
            now.setMinutes(now.getMinutes() + 10);

            ong.password_reset_token = token;
            ong.password_reset_expiration = now;
            await ong.save();
    
            mailer.sendMail({
                to: email,
                from: 'lucas.furtoso@gmail.com',
                template: 'auth/forgot-password',
                context: { token }
            }, (err) => {
                if (err)
                    return response.status(400).send({ error: 'Cannot send reset password email. '});
                
                return response.send({ message: "Reset password email sent." });
            });
    
        } catch (err) {
            response.status(400).send({ error: 'Error on password recuperation, try again'});
        }
    },

    async resetPassword (request, response) {
        const { email, token, password } = request.body;
    
        try {
            const ong = await Ong.findOne({ email });
            
            if (!ong)
                return response.status(400).send({ error: 'Ong not found.' })
            
            if (token !== ong.dataValues.password_reset_token)
                return response.status(400).send({ error: 'Invalid token.' })
    
            const now = new Date();
            
            if (now > ong.dataValues.password_reset_expiration)
                return response.status(400).send({ error: 'Token expired, please get a new one.' })
    
            const hash = await hashPassword(password);
            
            ong.password = hash;
            ong.password_reset_token = null;
            ong.password_reset_expiration = null;
    
            await ong.save();
    
            response.send({ message: "Password updated successfully" });
    
        } catch (err) {
            response.status(400).send({ error: 'Cannot reset password, try again.' })
        }
    }
};
