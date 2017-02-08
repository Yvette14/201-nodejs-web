const async = require('async');
const Category = require('../models/category');
const Item = require('../models/item');
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
    Item.findOne({categoryId: id}, (error, data) => {
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

  // delete(req, res, next) {
  //   const id = req.params.id;
  //   async.waterfall([
  //     (done) => {
  //       Item.findOne({categoryId: id}, done);
  //     },
  //     (data,done)=>{
  //       if(data){
  //         done(data);
  //       }
  //     }
  //   ])
  // }

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