require('should');
const request = require('supertest');
const refreshMongo = require('../refreshMongo');
const app = require('../app');
const Item = require('../models/item');

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

  it('get one 200', (done) => {
    request(app)
      .get('/items/5899256418d3dc09c04e5552')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('商品一');
      })
      .end(done);
  });

  it('get one 404', (done) => {
    request(app)
      .get('/items/5899256418d3dc09c04e5542')
      .expect(404)
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
      .expect((res) => {
        Item.findOne(item, (err, data) => {
          if (err) {
            return next(err);
          }
          res.body.uri.should.equal('items/' + data._id);
        })
      })
      .end(done);
  });

  it('delete 204', (done) => {
    request(app)
      .delete('/items/5899256418d3dc09c04e5556')
      .expect(204)
      .end(done);
  });

  it('delete 404', (done) => {
    request(app)
      .delete('/items/5899256418d3dc09c04e5546')
      .expect(404)
      .end(done);
  });

  it('update 204', (done) => {
    const item = {
      price: 3.0
    };
    request(app)
      .put('/items/5899256418d3dc09c04e5552')
      .send(item)
      .expect(204)
      .end(done);
  });

  it('update 404', (done) => {
    const item = {
      price: 3.0
    };
    request(app)
      .put('/items/5899256418d3dc09c04e5452')
      .send(item)
      .expect(404)
      .end(done);
  });

});