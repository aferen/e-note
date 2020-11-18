require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.set('port', process.env.PORT || 5000)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(require('./app/routes'))
app.listen(app.get('port'))
module.exports = app;