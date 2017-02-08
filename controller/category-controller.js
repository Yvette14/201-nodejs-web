const async = require('async');
const Category = require('../model/category');
const Item = require('../model/item');
const httpCode = require('../constant/httpCode.json');

const CategoryController = class {

  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Category.find({}, done);
      },
      totalCount: (done) => {
        Category.count(done);
      },
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOne({_id: categoryId}, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.status(httpCode.OK).send(data);
    })
  }

  create(req, res, next) {
    const category = req.body;
    Category.create(category, (err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: "categories/" + data._id});
    })
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    async.waterfall([
      (done) => {
        Item.findOne({category: categoryId}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findOneAndRemove({_id: categoryId}, done);
        }
      }
    ], (err, data) => {
      if (err === true) {
        return res.sendStatus(httpCode.BAD_REQUEST);
      }
      if (err) {
        return next(err);
      }

      if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOneAndUpdate({_id: categoryId}, req.body, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

};

module.exports = CategoryController;