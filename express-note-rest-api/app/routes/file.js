var express = require('express');
var router = express.Router();
var FileController = require('../controllers/file');
const Auth = require('../middleware/auth');

router.get('/structure',Auth, FileController.getStructure);

router.get('/',Auth, FileController.getFile);

router.get('/downloadFiles',Auth, FileController.downloadFiles);

router.post('/createFolder',Auth, FileController.createFolder);

router.post('/deleteFolder',Auth, FileController.deleteFolder);

router.put('/',Auth, FileController.updateFile);

router.post('/',Auth, FileController.createFile);

router.post('/deleteFile',Auth, FileController.deleteFile);

module.exports = router;