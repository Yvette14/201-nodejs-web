require('should');
const request = require('supertest');
const refreshMongo = require('../refreshMongo');
const app = require('../app');

describe('cart', () => {
  beforeEach(() => {
    refreshMongo();
  });

  it('get all', (done) => {
    request(app)
      .get('/carts')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('get one', (done) => {
    request(app)
      .get('/carts/5899256418d3dc09c04e555a')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.userId.should.equal('001');
      })
      .end(done);
  });

  it('create', (done) => {
    const cart = {
      userId: '010',
      items: [
        {
          count: 1,
          itemId: '5899256418d3dc09c04e5552'
        },
        {
          count: 3,
          itemId: '5899256418d3dc09c04e5555'
        }
      ]
    };

    request(app)
      .post('/carts')
      .send(cart)
      .expect(201)
      .end(done);
  });

  it('delete', (done) => {
    request(app)
      .delete('/carts/5899256418d3dc09c04e555a')
      .expect(204)
      .end(done);
  });

  it('put', (done) => {
    const cart = {
      userId: '002',
      items: [
        {
          count: 3,
          itemId: '5899256418d3dc09c04e5552'
        },
        {
          count: 2,
          itemId: '5899256418d3dc09c04e5555'
        }
      ]
    };

    request(app)
      .put('/carts/5899256418d3dc09c04e555a')
      .send(cart)
      .expect(204)
      .end(done);
  })
});
