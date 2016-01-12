var request = require('supertest');
var async   = require('async');

describe('views', function () {
  var server;

  beforeEach(function () {
    // otherwise node keeps an instance of ../bin/www and the server will
    // be closed on second-onwards test calls
    delete require.cache[require.resolve('../bin/www')];
    server = require('../bin/www');
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('responds to /purpose', function testPurpose(done) {
    request(server)
      .get('/purpose')
      .expect(200, done);
  });

  it('responds to /guidelines', function testGuidelines(done) {
    request(server)
      .get('/guidelines')
      .expect(200, done);
  });

  it('responds to /intended-outcomes', function testIntendedOutcomes(done) {
    request(server)
      .get('/intended-outcomes')
      .expect(200, done);
  });

  it('responds to /generic-level-definition', function testGenericLevelDefinition(done) {
    request(server)
      .get('/generic-level-definition')
      .expect(200, done);
  });

  it('responds to /scope/[defined-scope]', function testScope(done) {
    var scopes = ['continuous-integration',
                  'quality-assurance',
                  'configuration-management',
                  'environments-and-deployment',
                  'data-management',
                  'technical-architecture',
                  'organisational-alignment',
                  'visibility'];
    
    async.each(scopes, function iterateScopes(item, callback) {
      request(server)
        .get('/scope/' + item)
        .expect(200, callback);
    }, function allScopesDone(err) {
      if (err) throw err;
      done();
    });
  });

  it('responds to /maturity-level', function testMaturityLevel(done) {
    request(server)
      .get('/maturity-level')
      .expect(200, done);
  });
});