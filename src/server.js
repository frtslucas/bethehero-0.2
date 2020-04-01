const express = require('express');
const bodyParser = require('body-parser');
const router = require('./app/router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(3000);