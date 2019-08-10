const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, reQuired: true, trim: true },
  live: { type: String, default: '' },
  born: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  abilities: { type: String, default: '' },
  physicalD: { type: String, default: '' },
  characterD: { type: String, default: '' }
});

module.exports = Item = mongoose.model('item', ItemSchema);
