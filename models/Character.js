const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: { type: String, required: true, trim: true },
  live: { type: String, default: '' },
  born: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  abilities: { type: String, default: '' },
  physicalD: { type: String, default: '' },
  characterD: { type: String, default: '' },
  inTrash: { type: Boolean, required: true },
  story: [
    {
      event: { type: String, required: true },
      time: { type: String, required: true },
      effect: { type: String, required: true },
      intensity: { type: Number, required: true },
      title: { type: String, required: true },
      beforeColor: { type: String, required: true },
      color: { type: String, required: true }
    }
  ]
});

module.exports = Character = mongoose.model('character', CharacterSchema);
