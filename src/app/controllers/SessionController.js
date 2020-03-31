const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/authConfig.json');
const mailer = require('../../modules/mailer');
const User = require('../models/User');

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
            if (await User.findOne({ where: {email} }))
                return response.status(400).send({ error: 'Email is already registered.' });

            const hash = await hashPassword(password);

            const user = await User.create(
                Object.assign(request.body, { password: hash })
              );

            user.password = undefined;
            user.password_reset_token = undefined;
            user.password_reset_expiration = undefined;

            return response.send({ 
                user,
                token: generateToken({ id: user.id })
            })

        } catch (err) {
            return response.status(400).send({ error: 'Registration failed.' });
        }
    },

    async login (request, response) {
        const { email, password } = request.body;
        
        const user = await User.findOne({ where: {email} })

        if (!user)
            return response.status(400).send({ error: 'User not found.' });
        
        if (! await bcrypt.compare(password, user.dataValues.password))
            return response.status(400).send({ error: 'Invalid password.' });
    
        user.password = undefined;
        user.password_reset_token = undefined;
        user.password_reset_expiration = undefined;
        
        response.send({ 
            user, 
            token: generateToken({ id: user.id })
        });
    },

    async forgotPassword (request, response) {
        const { email } = request.body;
    
        try {
            const user = await User.findOne({ email });
    
            if (!user)
                return response.status(400).send({ error: 'User not found.' });
    
            const token = crypto.randomBytes(20).toString('hex');
    
            const now = new Date();
            now.setMinutes(now.getMinutes() + 10);

            user.password_reset_token = token;
            user.password_reset_expiration = now;
            await user.save();
    
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
            const user = await User.findOne({ email });
            
            if (!user)
                return response.status(400).send({ error: 'User not found.' })
            
            if (token !== user.dataValues.password_reset_token)
                return response.status(400).send({ error: 'Invalid token.' })
    
            const now = new Date();
            
            if (now > user.dataValues.password_reset_expiration)
                return response.status(400).send({ error: 'Token expired, please get a new one.' })
    
            const hash = await hashPassword(password);
            
            user.password = hash;
            user.password_reset_token = null;
            user.password_reset_expiration = null;
    
            await user.save();
    
            response.send({ message: "Password updated successfully" });
    
        } catch (err) {
            response.status(400).send({ error: 'Cannot reset password, try again.' })
        }
    }
};
