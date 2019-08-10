const express = require("express");
const router = express.Router();

//item Model
const Item = require("../../models/Item");

//@route GET api/items
//@desc Get All Items
//@access Public
router.get("/", (req, res) => {
  Item.find().then(items => res.json(items));
});

//@route POST api/items
//@desc Create An Item
//@access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    live: req.body.live,
    born: req.body.born,
    philosophy: req.body.philosophy,
    abilities: req.body.abilities,
    physicalD: req.body.physicalD,
    characterD: req.body.characterD
  });

  if (!newItem.name) {
    return res.status(400).json({ msg: 'Please include a character name' })
  }

  newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Delete An Item
//@access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

//@route PATCH api/items/:id
//@desc Patch An Item
//@access Public
router.patch("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.updateOne({ $set: req.body }).then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
