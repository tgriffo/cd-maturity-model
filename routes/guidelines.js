var express = require('express');
var data = require('../data')

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('guidelines', { guidelines: data.guidelines });
});

module.exports = router;
