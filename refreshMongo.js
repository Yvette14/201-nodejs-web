import mongoose from 'mongoose';
import Item from './models/item';
import items from './data/items.json';

mongoose.connect('mongodb://localhost/supermarket');
Item.remove(() => {
  return;
});
Item.create(items);

mongoose.connection.close();