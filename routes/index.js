'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var charge = multer({ dest: 'uploads/' });

var upload = require('../controllers/upload');
var show = require('../controllers/show');

// GET home page.
router.get('/', function(req, res) {
  res.render('index');
});

// GET upload
router.get('/upload', upload.index);
router.post('/upload/upload', charge.single('myFile'), upload.upload);

// GET show
router.get('/show', show.basic);
router.get('/show/:place(\\d+)', show.places);

module.exports = router;
