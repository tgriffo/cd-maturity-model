var express = require('express');
var data = require('../data')

var router = express.Router();

/* GET purpose page. */
router.get('/', function(req, res, next) {
  res.render('purpose', { purpose: data.purpose });
});

module.exports = router;
