const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    CharacterId: { type: String, reQuired: true },
    event: { type: String, reQuired: true },
    time: { type: String, reQuired: true },
    effect: { type: String, reQuired: true },
    intensity: { type: Number, reQuired: true },
    title: { type: String, reQuired: true },
    beforeColor: { type: String, reQuired: true },
    color: { type: String, reQuired: true },
});

module.exports = Story = mongoose.model("story", StorySchema);