
var yaml = require('js-yaml'),
    fs   = require('fs');

var doc = yaml.safeLoad(fs.readFileSync(__dirname + '/cd-maturity-model.yaml', 'utf8'));

module.exports = doc;
