const async = require('async');
const Item = require('../models/item');
const httpCode = require('../constant/httpCode.json');

const ItemController = class {

  getAll(req, res, next) {
    async.series({
        items: (done) => {
          Item.find({}, done)
        },
        totalCount: (done) => {
          Item.count(done)
        }
      }, (err, result) => {
        if (err) {
          return next(err)
        }
        res.status(httpCode.OK).send(result);
      }
    );
  }

  getOne(req, res, next) {
    const id = req.params.id;
    Item.findById({_id: id})
      .populate('category')
      .exec((err, data) => {
        if (err) {
          return next(err);
        } else if (!data) {
          return res.sendStatus(httpCode.NOT_FOUND);
        }
        res.status(httpCode.OK).send(data);
      })
  }

  create(req, res, next) {
    const item = req.body;
    new Item(item).save((err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: 'items/' + data._id});
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Item.remove({_id: id}, (err, data) => {
      if (err) {
        return next(err);
      } else if (data.result.n === 0) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const id = req.params.id;
    Item.update({_id: id}, req.body, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }
};

module.exports = ItemController;
