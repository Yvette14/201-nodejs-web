const Category = require('../models/category');
const Item = require('../models/item');
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

  create(req, res, next) {
    const category = req.body;
    new Category(category).save((err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: "categories/" + data._id});
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Item.findOne({category: id}, (error, data) => {
      if (error) {
        return next(error);
      } else if (data !== null) {
        return res.sendStatus(httpCode.FORBIDDEN);
      }
      Category.remove({_id: id}, (err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(httpCode.NO_CONTENT);
      })
    })
  }

  update(req, res, next) {
    const id = req.params.id;
    Category.update({_id: id}, req.body, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

};

module.exports = CategoryController;