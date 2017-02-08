const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

const cartSchema = new Schema({
  userId: String,
  items: [{
    count: Number,
    itemId: {
      type: Schema.Types.ObjectId,
      //fixme type:Schema.ObjectId,
      ref: 'Item'
    }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);