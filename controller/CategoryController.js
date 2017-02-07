const Category = require('../models/category');
const httpCode = require('../contant/httpCode.json');

const CategoryController = class {

  getAll(req, res, next) {
    Category.find({}, (err, data) => {
      if (err) {
        return next(err);
      }
      Category.count((error, count) => {
        if (error) {
          return next(error);
        }
        res.status(httpCode.OK).send({items: data, totalCount: count});
      })
    })
  }
};

module.exports = CategoryController;