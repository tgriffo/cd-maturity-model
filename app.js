var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var purpose = require('./routes/purpose');
var guidelines = require('./routes/guidelines');
var intendedOutcomes = require('./routes/intended-outcomes');
var levels = require('./routes/levels');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/purpose', purpose);
app.use('/guidelines', guidelines);
app.use('/intended-outcomes', intendedOutcomes);

app.use('/generic-level-definition',          levels['generic-levels-definitions']);

app.use('/scope/continuous-integration',      levels['continuous-integration']);
app.use('/scope/quality-assurance',           levels['quality-assurance']);
app.use('/scope/configuration-management',    levels['configuration-management']);
app.use('/scope/environments-and-deployment', levels['environments-and-deployment']);
app.use('/scope/data-management',             levels['data-management']);
app.use('/scope/technical-architecture',      levels['technical-architecture']);
app.use('/scope/organisational-alignment',    levels['organisational-alignment']);
app.use('/scope/visibility',                  levels['visibility']);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
