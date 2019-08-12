const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//item Model
const Character = require('../../models/Character');

//@route GET api/character
//@desc Get All Characters
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user.id });
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/character
//@desc Create A Character
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCharacter = new Character({
        user: req.user.id,
        name: req.body.name,
        live: req.body.live,
        born: req.body.born,
        philosophy: req.body.philosophy,
        abilities: req.body.abilities,
        physicalD: req.body.physicalD,
        characterD: req.body.characterD
      });

      const character = await newCharacter.save();

      res.json(character);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/character/:id
//@desc Delete a character
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ msg: 'Character not found' });
    }

    if (character.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await character.remove();

    res.json({ msg: 'Caracter removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Character not found' });
    }

    res.status(500).send('Server Error');
  }
});

//@route PATCH api/items/:id
//@desc Patch An Item
//@access Public
router.patch('/:id', (req, res) => {
  Character.findById(req.params.id)
    .then(character =>
      character
        .updateOne({ $set: req.body })
        .then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
