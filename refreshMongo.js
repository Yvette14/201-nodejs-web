import mongoose from 'mongoose';
import Item from './models/item';
import items from './data/items.json';
import Category from './models/category';
import categories from './data/categories.json';
import Cart from './models/cart';
import carts from './data/carts.json';

mongoose.connect('mongodb://localhost/supermarket');
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
mongoose.connection.close();