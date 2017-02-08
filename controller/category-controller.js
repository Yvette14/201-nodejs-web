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
    const id = req.params.id;
    Category.findOne({_id: id}, (err, data) => {
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
    new Category(category).save((err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: "categories/" + data._id});
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    async.waterfall([
      (done) => {
        Item.findOne({category: id}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findOneAndRemove({_id: id}, done);
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
    const id = req.params.id;
    Category.findOneAndUpdate({_id: id}, req.body, (err, data) => {
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