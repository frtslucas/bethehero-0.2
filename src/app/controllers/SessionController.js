const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/authConfig.json');
const mailer = require('../../modules/mailer');
const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
};

router.post('/register', async (request, response) => {
    const { email } = request.body;
    try {
        if (await User.findOne({ email }))
            return response.status(400).send({ error: 'Email is already registered.' });

        const user = await User.create(request.body);

        user.password = undefined;

        return response.send({ 
            user,
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return response.status(400).send({ error: 'Registration failed.' });
    }
});

router.post('/login', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return response.status(400).send({ error: 'User not found.' });
    
    if (! await bcrypt.compare(password, user.password))
        return response.status(400).send({ error: 'Invalid password.' });

    user.password = undefined;
    
    response.send({ 
        user, 
        token: generateToken({ id: user.id })
    });
});

router.post('/forgot-password', async (request, response) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return response.status(400).send({ error: 'User not found.' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setMinutes(now.getMinutes() + 10);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpiration: now,
            }
        });

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
})

router.post('/reset-password', async (request, response) => {
    const { email, token, password } = request.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpiration');
        
        if (!user)
            return response.status(400).send({ error: 'User not found.' })

    console.log(token, user.passwordResetToken);
        
        if (token !== user.passwordResetToken)
            return response.status(400).send({ error: 'Invalid token.' })

        const now = new Date();
        
        if (now > user.passwordResetExpiration)
            return response.status(400).send({ error: 'Token expired, please get a new one.' })

        user.password = password;

        await user.save();

        response.send();

    } catch (err) {
        response.status(400).send({ error: 'Cannot reset password, try again.' })
    }
})

module.exports = (app) => app.use('/session', router);