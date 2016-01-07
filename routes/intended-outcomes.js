var express = require('express');
var data = require('../data')

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('intended-outcomes', { intendedOutcomes: data['intended outcomes'] });
});

module.exports = router;
