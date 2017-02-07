import mongoose from 'mongoose';
import Item from './models/item';
import items from './data/items.json';
import Category from './models/category';
import categories from './data/categories.json';

mongoose.connect('mongodb://localhost/supermarket');
Item.remove(() => {
  return;
});
Item.create(items);

Category.remove(() => {
  return;
});
Category.create(categories);

mongoose.connection.close();