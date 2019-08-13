const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: { type: String, reQuired: true, trim: true },
  live: { type: String, default: '' },
  born: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  abilities: { type: String, default: '' },
  physicalD: { type: String, default: '' },
  characterD: { type: String, default: '' },
  story: [
    {
      event: { type: String, reQuired: true },
      time: { type: String, reQuired: true },
      effect: { type: String, reQuired: true },
      intensity: { type: Number, reQuired: true },
      title: { type: String, reQuired: true },
      beforeColor: { type: String, reQuired: true },
      color: { type: String, reQuired: true }
    }
  ]
});

module.exports = Character = mongoose.model('character', CharacterSchema);
