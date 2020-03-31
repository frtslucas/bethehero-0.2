const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');

require('./database/connection')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.json());
app.use(routes);

app.listen(3000);