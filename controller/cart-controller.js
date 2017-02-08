const async = require('async');
const Cart = require('../model/cart');
const httpCode = require('../constant/httpCode.json');

function transIdToUri(items) {
  return items.map((item) => {
    return {count: item.count, uri: 'items/' + item.item};
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
    const cartId = req.params.cartId;
    Cart.findOne({_id: cartId}, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      let doc = data.toJSON();
      doc.items = transIdToUri(doc.items);
      res.status(httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    const cart = req.body;
    Cart.create(cart, (err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: 'carts/' + data._id});
    });
  }

  delete(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndRemove({_id: cartId}, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndUpdate({_id: cartId}, req.body, (err, data) => {
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