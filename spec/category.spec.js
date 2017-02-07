require('should');
const request = require('supertest');
const refreshMongo = require('../refreshMongo');
const app = require('../app');

describe('category', () => {
  beforeEach(() => {
    refreshMongo();
  });

  it('get all', (done) => {
    request(app)
      .get('/categories')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.totalCount.should.equal(7);
      })
      .end(done);
  });

  it('get one', (done) => {
    request(app)
      .get('/categories/589952c2e063c41484b0dc1f')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('类别一');
      })
      .end(done);
  });

  it('create', (done) => {
    const category = {
      name: '新类别'
    };

    request(app)
      .post('/categories')
      .send(category)
      .expect(201)
      .end(done);
  });

  it('delete', (done) => {
    request(app)
      .delete('/categories/589952c2e063c41484b0dc6a')
      .expect(204)
      .end(done);
  });

  it('put', (done) => {
    const category = {
      name: '修改的类别'
    };

    request(app)
      .put('/categories/589952c2e063c41484b0dc1f')
      .send(category)
      .expect(204)
      .end(done);
  })
});