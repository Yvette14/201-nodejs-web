require('should');
const request = require('supertest');
const refreshMongo = require('../mongo-tool');
const app = require('../app');
const Category = require('../model/category');

describe('category', () => {

  it('GET /categories', (done) => {
    request(app)
      .get('/categories')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(7);
      })
      .end(done);
  });

  it('GET /categories/:id 200', (done) => {
    request(app)
      .get('/categories/589952c2e063c41484b0dc1f')
      .expect(200)
      .expect((res) => {
        res.body.name.should.equal('类别一');
      })
      .end(done);
  });

  it('GET /categories/:id 404', (done) => {
    request(app)
      .get('/categories/589952c2e063c41484b0dc1e')
      .expect(404)
      .end(done);
  });

  it('POST /categories', (done) => {
    const category = {
      name: '新类别'
    };

    request(app)
      .post('/categories')
      .send(category)
      .expect(201)
      .expect((res) => {
        Category.findOne(category, (err, data) => {
          if (err) {
            return next(err);
          }
          res.body.uri.should.equal('categories/' + data._id);
        })
      })
      .end(done);
  });

  it('DELETE /categories/:id 204', (done) => {
    request(app)
      .delete('/categories/589952c2e063c41484b0dc6a')
      .expect(204)
      .end(done);
  });

  it('DELETE /categories/:id 400', (done) => {
    request(app)
      .delete('/categories/589952c2e063c41484b0dc1f')
      .expect(400)
      .end(done);
  });

  it('PUT /categories/:id 204', (done) => {
    const category = {
      name: '修改的类别'
    };

    request(app)
      .put('/categories/589952c2e063c41484b0dc1f')
      .send(category)
      .expect(204)
      .end(done);
  });

  it('PUT /categories/:id 400', (done) => {
    const category = {
      name: '修改的类别'
    };

    request(app)
      .put('/categories/589952c2e063c41484b0dd1f')
      .send(category)
      .expect(404)
      .end(done);
  });
});
