require('should');
const request = require('supertest');
const refreshMongo = require('../refreshMongo');
const app = require('../app');

describe('item api', () => {
  beforeEach(() => {
    refreshMongo();
  });

  it('get all', (done) => {
    request(app)
      .get('/items')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.totalCount.should.equal(5);
      })
      .end(done);
  });

  it('get one', (done) => {
    request(app)
      .get('/items/5899256418d3dc09c04e5552')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('商品一');
      })
      .end(done);
  });

  it('create', (done) => {
    const item = {
      name: '新商品',
      price: 3.0,
      categoryId: '589952c2e063c41484b0dc6f'
    };
    request(app)
      .post('/items')
      .send(item)
      .expect(201)
      .end(done);
  });

  it('delete', (done) => {
    request(app)
      .delete('/items/5899256418d3dc09c04e5556')
      .expect(204)
      .end(done);
  });

  it('put', (done) => {
    const item = {
      price: 3.0
    };
    request(app)
      .put('/items/5899256418d3dc09c04e5552')
      .send(item)
      .expect(204)
      .end(done);
  })
});