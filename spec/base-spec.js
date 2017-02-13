const refreshMongo = require('../mongo-tool');

beforeEach((done) => {
  refreshMongo(() => {
    done();
  });
});