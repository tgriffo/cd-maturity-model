var express = require('express');
var data = require('../data')

var generic = express.Router();
var scopeCI,
    scopeQA,
    scopeCM,
    scopeED,
    scopeDM,
    scopeTA,
    scopeOA,
    scopeVi;

generic.get('/', function(req, res, next) {
  res.render('levels', { 
    title       : 'Generic Level\'s Definition',
    description : '',
    levels      : data['generic levels definitions'] 
  });
});

scopeCI = createRouterForScope('Continuous Integration');
scopeQA = createRouterForScope('Quality Assurance');
scopeCM = createRouterForScope('Configuration Management');
scopeED = createRouterForScope('Environments and Deployment');
scopeDM = createRouterForScope('Data Management');
scopeTA = createRouterForScope('Technical Architecture');
scopeOA = createRouterForScope('Organisational Alignment');
scopeVi = createRouterForScope('Visibility');

function createRouterForScope(scopeTitle) {
  var router = express.Router();
  router.get('/', function(req, res, next) {
    var scope = findScope(data, scopeTitle);
    res.render('levels', { 
      title       : scopeTitle,
      description : scope.description,
      levels      : scope.levels
    });
  });
  return router;
}

function findScope(data, scope) {
  var ret = {};
  data.scopes.forEach(function (item) {
    if (item.scope && item.scope === scope) {
      ret = item;
      return;
    }
  });
  return ret;
}

module.exports = {
  'generic-levels-definitions'  : generic,
  'continuous-integration'      : scopeCI,
  'quality-assurance'           : scopeQA,
  'configuration-management'    : scopeCM,
  'environments-and-deployment' : scopeED,
  'data-management'             : scopeDM,
  'technical-architecture'      : scopeTA,
  'organisational-alignment'    : scopeOA,
  'visibility'                  : scopeVi
};
