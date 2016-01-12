var express    = require('express');
var data       = require('../data');

var assessment = data.assessment;
var model      = data.model;

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('maturity-level', {  });
});

router.get('/data', function(req, res, next) {
  var labels = model.scopes.map(function (scope) {
    return scope.scope;
  });

  var datasets = mapDatasets(labels);

  var data = {
    labels   : labels,
    datasets : datasets
  };

  var assessmentData = {
    'date last update' : assessment['date last update'],
    'assessment for'   : assessment['assessment for'],
    data               : data
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(assessmentData));
});

function mapDatasets(labels) {
  var datasets = [];

  assessment.assessments.forEach(function (obj) {
    var item = {
      label : obj.dataset,
      data  : new Array(labels.length)
    };
    obj.scores.forEach(function (scores) {
      var index = labels.findIndex(function(item) { return item === scores.scope; } );
      if (index !== -1 && index < item.data.length) {
        item.data[index] = scores.level;
      }
    });
    datasets.push(item);
  });

  return datasets;
}

module.exports = router;
