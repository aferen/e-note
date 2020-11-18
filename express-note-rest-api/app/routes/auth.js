var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/auth');

router.post('/login', AuthController.login);

module.exports = router;