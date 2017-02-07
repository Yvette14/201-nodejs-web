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

  getOne(req, res, next) {
    const id = req.params.id;
    Item.findById({_id: id}, (err, data) => {
      if (data === null) {
        return res.sendStatus(httpCode.NOT_FOUND);
      } else if (err) {
        return next(err);
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
    Item.update({_id: id}, req.body, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }
};

module.exports = ItemController;
