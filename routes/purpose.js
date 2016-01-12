var express = require('express');
var model   = require('../data').model;

var router = express.Router();

/* GET purpose page. */
router.get('/', function(req, res, next) {
  res.render('purpose', { purpose: model.purpose });
});

module.exports = router;
