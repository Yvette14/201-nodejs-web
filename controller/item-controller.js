const async = require('async');
const Item = require('../model/item');
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
    const itemId = req.params.itemId;
    Item.findById({_id: itemId})
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
    Item.create(item, (err, data) => {
      if (err) {
        return next(err);
      }
      res.status(httpCode.CREATE).send({uri: 'items/' + data._id});
    })
  }

  delete(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndRemove({_id: itemId}, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndUpdate({_id: itemId}, req.body, (err, data) => {
      if (err) {
        return next(err);
      } else if (!data) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

};

module.exports = ItemController;
