const Cart = require('../models/cart');
const httpCode = require('../contant/httpCode.json');

const CartController = class {

  getAll(req, res, next) {
    Cart.find()
      .populate('items.item')
      .exec((err, data) => {
        if (err) {
          return next(err);
        }
        Cart.count((error, count) => {
          if (error) {
            return next(error);
          }
          res.status(httpCode.OK).send({items: data, totalCount: count});
        })
      })
  }
};

module.exports = CartController;