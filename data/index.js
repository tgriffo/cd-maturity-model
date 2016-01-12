
var yaml = require('js-yaml'),
    fs   = require('fs');

var model      = yaml.safeLoad(fs.readFileSync(__dirname + '/cd-maturity-model.yaml', 'utf8'));
var assessment = yaml.safeLoad(fs.readFileSync(__dirname + '/assessment.yaml', 'utf8'));

module.exports = {
  model      : model,
  assessment : assessment
};
