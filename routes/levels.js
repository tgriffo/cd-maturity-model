var express = require('express');

var model   = require('../data').model;

var genericLevelDefinition = express.Router();
var scope                  = express.Router();

genericLevelDefinition.get('/', function(req, res, next) {
  res.render('levels', { 
    title       : 'Generic Level\'s Definition',
    description : '',
    levels      : model['generic levels definitions'] 
  });
});

scope.get('/:scope', function(req, res, next) {
  var scopeTitle = req.params.scope;
  var scope = findScope(model, scopeTitle);

  if (scope) {
    res.render('levels', { 
      title       : scope.scope,
      description : scope.description,
      levels      : scope.levels
    });
  }
  next();
});

function createRouterForScope(scopeTitle) {
  var router = express.Router();
  router.get('/', function(req, res, next) {
    var scope = findScope(model, scopeTitle);
    res.render('levels', { 
      title       : scope.scope,
      description : scope.description,
      levels      : scope.levels
    });
  });
  return router;
}

function findScope(data, scope) {
  return data.scopes.find(function (elem, index, array) {
    return elem.scope.toLowerCase().replace(new RegExp(' ', 'g'), '-') === scope;
  });
}

module.exports = {
  scope                  : scope,
  genericLevelDefinition : genericLevelDefinition
};
