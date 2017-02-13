require('should');
const request = require('supertest');
const refreshMongo = require('../mongo-tool');
const app = require('../app');
const Item = require('../model/item');

describe('item api', () => {

  it('GET /items', (done) => {
    request(app)
      .get('/items')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(5);
      })
      .end(done);
  });

  it('GET /items/:id 200', (done) => {
    request(app)
      .get('/items/5899256418d3dc09c04e5552')
      .expect(200)
      .expect((res) => {
        res.body.name.should.equal('商品一');
      })
      .end(done);
  });

  it('GET /items/:id 404', (done) => {
    request(app)
      .get('/items/5899256418d3dc09c04e5542')
      .expect(404)
      .end(done);
  });

  it('POST /items', (done) => {
    const item = {
      name: '新商品',
      price: 3.0,
      category: '589952c2e063c41484b0dc6f'
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

  it('DELETE /items/:id 204', (done) => {
    request(app)
      .delete('/items/5899256418d3dc09c04e5556')
      .expect(204)
      .end(done);
  });

  it('DELETE /items/:id 404', (done) => {
    request(app)
      .delete('/items/5899256418d3dc09c04e5546')
      .expect(404)
      .end(done);
  });

  it('PUT /items/:id 204', (done) => {
    const item = {
      price: 3.0
    };
    request(app)
      .put('/items/5899256418d3dc09c04e5552')
      .send(item)
      .expect(204)
      .end(done);
  });

  it('PUT /items/:id 404', (done) => {
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