const request = require('supertest');
const refreshMongo = require('../refreshMongo');
const app = require('../app');

describe('item api', () => {
  beforeEach(() => {
    refreshMongo();
  });

  it('get all', () => {
    request(app)
      .get('/items')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.totalCount.should.equal(5);
      });
  });

  it('get one', () => {
    request(app)
      .get('/items/5899256418d3dc09c04e5552')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.name.should.equal('商品一');
      })
  });

  it('create', () => {
    const item = {
      name: '新商品',
      price: 3.0,
      categoryId: '589952c2e063c41484b0dc6f'
    };
    request(app)
      .post('/items')
      .expect(201);
  });

  it('delete', () => {
    request(app)
      .delete('/items/5899256418d3dc09c04e5556')
      .expect(204);
  });

  it('put', () => {
    const item = {
      price: 3.0
    };
    request(app)
      .put('/items/5899256418d3dc09c04e5552')
      .expect(204);
  })
});