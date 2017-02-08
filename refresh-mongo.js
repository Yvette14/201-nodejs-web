const mongoose = require('mongoose');
const Item = require('./models/item');
const items = require('./data/items.json');
const Category = require('./models/category');
const categories = require('./data/categories.json');
const Cart = require('./models/cart');
const carts = require('./data/carts.json');

function refreshMongo() {
  Item.remove(() => {
    return;
  });
  Item.create(items);

  Category.remove(() => {
    return;
  });
  Category.create(categories);

  Cart.remove(() => {
    return;
  })

  Cart.create(carts);
}

mongoose.connection.close();
module.exports = refreshMongo;