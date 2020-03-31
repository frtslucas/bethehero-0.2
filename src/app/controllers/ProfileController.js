const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

module.exports = {
    async index (request, response) {
        response.send({ ok: true, user: request.userId });
    }
}
