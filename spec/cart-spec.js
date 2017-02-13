require('should');
const request = require('supertest');
const refreshMongo = require('../mongo-tool');
const app = require('../app');
const Cart = require('../model/cart');

describe('cart', () => {

  it('GET /carts', (done) => {
    request(app)
      .get('/carts')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('GET /carts:id 200', (done) => {
    request(app)
      .get('/carts/5899256418d3dc09c04e555a')
      .expect(200)
      .expect((res) => {
        res.body.userId.should.equal('001');
      })
      .end(done);
  });

  it('GET /carts:id 404', (done) => {
    request(app)
      .get('/carts/5899256418d3dc09c04e545a')
      .expect(404)
      .end(done);
  });

  it('POST /carts', (done) => {
    const cart = {
      userId: '010',
      items: [
        {
          count: 1,
          itemId: '5899256418d3dc09c04e5552',
          _id: '5899d9cfb9b4bc55c5b044b1'
        },
        {
          count: 3,
          itemId: '5899256418d3dc09c04e5555',
          _id: '5899d9cfb9b4bc55c5b044b2'
        }
      ]
    };

    request(app)
      .post('/carts')
      .send(cart)
      .expect(201)
      .expect((res) => {
        Cart.findOne({userId: '010'}, (err, data) => {
          if (err) {
            return next(err);
          }
          res.body.uri.should.equal('carts/' + data._id);
        })
      })
      .end(done);
  });

  it('DELETE /carts:id 204', (done) => {
    request(app)
      .delete('/carts/5899256418d3dc09c04e555a')
      .expect(204)
      .end(done);
  });

  it('DELETE /carts:id 404', (done) => {
    request(app)
      .delete('/carts/5899256418d3dc09c04e545a')
      .expect(404)
      .end(done);
  });

  it('PUT /carts:id 204', (done) => {
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
  });

  it('DELETE /carts:id 404', (done) => {
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
      .put('/carts/5899256418d3dc09c04e545a')
      .send(cart)
      .expect(404)
      .end(done);
  });

});
