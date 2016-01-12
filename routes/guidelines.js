var express = require('express');
var model   = require('../data').model

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('guidelines', { guidelines: model.guidelines });
});

module.exports = router;
