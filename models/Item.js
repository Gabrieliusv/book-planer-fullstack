const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, reQuired: true, trim: true },
  live: { type: String, default: '' },
  born: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  abilities: { type: String, default: '' },
  physicalD: { type: String, default: '' },
  characterD: { type: String, default: '' },
  story: [
    {
      event: String,
      time: String,
      effect: String,
      intensity: Number,
      title: String,
      beforeColor: String,
      color: String
    }
  ]
});

module.exports = Item = mongoose.model("item", ItemSchema);
