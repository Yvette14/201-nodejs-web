const mongoose = require('mongoose');
const async = require('async');
const Item = require('./model/item');
const items = require('./data/items.json');
const Category = require('./model/category');
const categories = require('./data/categories.json');
const Cart = require('./model/cart');
const carts = require('./data/carts.json');

function refreshMongo(done) {
  async.series([
    (cb) => {
      Item.find().remove(cb);
    },
    (cb) => {
      Item.create(items, cb);
    },
    (cb) => {
      Category.find().remove(cb);
    },
    (cb) => {
      Category.create(categories, cb);
    },
    (cb) => {
      Cart.find().remove(cb);
    },
    (cb) => {
      Cart.create(carts, cb);
    }
  ], () => {
    // mongoose.connection.close();
    done();
  });
}

module.exports = refreshMongo;