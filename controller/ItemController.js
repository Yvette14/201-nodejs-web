const Item = require('../models/item');
const httpCode = require('../contant/httpCode.json');

const ItemController = class {
  getAll(req, res, next) {
    Item.find({}, (err, data) => {
      if (err) {
        return next(err);
      }
      Item.count((err, doc) => {
        if (err) {
          return next(err);
        }
        res.status(httpCode.OK).send({items: data, totalCount: doc})
      })
    })
  }
};

module.exports = ItemController;
