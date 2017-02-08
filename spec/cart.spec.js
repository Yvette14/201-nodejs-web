require('should');
const request = require('supertest');
const refreshMongo = require('../refresh-mongo');
const app = require('../app');
const Cart = require('../model/cart');

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

  it('get one 200', (done) => {
    request(app)
      .get('/carts/5899256418d3dc09c04e555a')
      .expect((res) => {
        res.statusCode.should.equal(200);
        res.body.userId.should.equal('001');
      })
      .end(done);
  });

  it('get one 404', (done) => {
    request(app)
      .get('/carts/5899256418d3dc09c04e545a')
      .expect(404)
      .end(done);
  });

  it('create', (done) => {
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

  it('delete 204', (done) => {
    request(app)
      .delete('/carts/5899256418d3dc09c04e555a')
      .expect(204)
      .end(done);
  });

  it('delete 404', (done) => {
    request(app)
      .delete('/carts/5899256418d3dc09c04e545a')
      .expect(404)
      .end(done);
  });

  it('update 204', (done) => {
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

  it('update 404', (done) => {
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
