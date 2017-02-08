const async = require('async');
const Cart = require('../models/cart');
const httpCode = require('../constant/httpCode.json');

function transIdToUri(items) {
  return items.map((item) => {
    return {count: item.count, uri: 'items/' + item.itemId};
  })
}

const CartController = class {

  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Cart.find({}, (err, data) => {
          if (err) {
            return next(err);
          }
          let items = data.map((doc) => {
            let cart = doc.toJSON();
            cart.items = transIdToUri(cart.items);
            return cart;
          });
          done(null, items);
        });
      },
      totalCount: (done) => {
        Cart.count(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const id = req.params.id;
    Cart.findOne({_id: id}, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      let doc = data.toJSON();
      const items = transIdToUri(doc.items);
      doc.items = items;
      res.status(httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    const cart = req.body;
    new Cart(cart).save((err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: 'carts/' + data._id});
    });
  }

  delete(req, res, next) {
    const id = req.params.id;
    Cart.findOneAndRemove({_id: id}, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const id = req.params.id;
    Cart.findOneAndUpdate({_id: id}, req.body, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

};

module.exports = CartController;