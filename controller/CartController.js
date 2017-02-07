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

  getOne(req, res, next) {
    const id = req.params.id;
    Cart.findOne({_id: id})
      .populate('items.item')
      .exec((err, data) => {
        if (data === null) {
          return res.sendStatus(httpCode.NOT_FOUND);
        } else if (err) {
          return next(err);
        }
        res.status(httpCode.OK).send(data);
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
    Cart.remove({_id: id}, (err, data) => {
      if (data.result.n === 0) {
        return res.sendStatus(httpCode.NOT_FOUND);
      } else if (err) {
        return next(err);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const id = req.params.id;
    Cart.update({_id: id}, req.body, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

};

module.exports = CartController;