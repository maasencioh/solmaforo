var express = require('express');
var router = express.Router();

var upload = require('../controllers/upload');

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET upload
router.get('/upload', upload.index);
router.post('/upload/upload', upload.upload);

// GET show
router.get('/show', function(req, res, next) {
  res.render('show');
});

module.exports = router;
