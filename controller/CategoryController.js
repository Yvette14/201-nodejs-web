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

  getOne(req, res, next) {
    const id = req.params.id;
    Category.findOne({_id: id}, (err, data) => {
      if (data === null) {
        return res.sendStatus(httpCode.NOT_FOUND);
      } else if (err) {
        return next(err);
      }
      res.status(httpCode.OK).send(data);
    })
  }
};

module.exports = CategoryController;