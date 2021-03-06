const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (request, response) => {
    response.send({ ok: true, user: request.userId });
});

module.exports = (app) => app.use('/profile', router)