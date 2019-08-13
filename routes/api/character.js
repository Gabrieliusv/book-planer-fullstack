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

//@route PATCH api/character/:id
//@desc Update A Character
//@access Private
router.patch(
  '/:id',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      live,
      born,
      philosophy,
      abilities,
      physicalD,
      characterD
    } = req.body;

    // Build character object
    const characterFields = {};

    if (name) characterFields.name = name;
    if (live) characterFields.live = live;
    if (born) characterFields.born = born;
    if (philosophy) characterFields.philosophy = philosophy;
    if (abilities) characterFields.abilities = abilities;
    if (physicalD) characterFields.physicalD = physicalD;
    if (characterD) characterFields.characterD = characterD;

    try {
      let character = await Character.findById(req.params.id);

      if (!character) {
        return res.status(404).json({ msg: 'Character not found' });
      }

      if (character.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      if (character) {
        character = await Character.findOneAndUpdate(
          { _id: req.params.id },
          { $set: characterFields },
          { new: true }
        );

        return res.json(character);
      }
    } catch (err) {
      console.error(err.message);

      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Character not found' });
      }

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

//@route PUT api/characters/story/:id
//@desc add a story
//@access Private

router.put(
  '/story/:id',
  auth,
  [
    check('event', 'Event ir required')
      .not()
      .isEmpty(),
    check('time', 'Time ir required')
      .not()
      .isEmpty(),
    check('effect', 'Effect ir required')
      .not()
      .isEmpty(),
    check('intensity', 'Intensity ir required')
      .not()
      .isEmpty(),
    check('title', 'Title ir required')
      .not()
      .isEmpty(),
    check('beforeColor', 'Before Color ir required')
      .not()
      .isEmpty(),
    check('color', 'Color ir required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const character = await Character.findById(req.params.id);

      if (!character) {
        return res.status(404).json({ msg: 'Character not found' });
      }

      if (character.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const newStory = { ...req.body };

      character.story.push(newStory);

      await character.save();

      res.json(character.story);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Character not found' });
      }

      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PATCH api/characters/story/:id/:story_id
//@desc update a story
//@access Private

router.patch(
  '/story/:id/:story_id',
  auth,
  [
    check('event', 'Event ir required')
      .not()
      .isEmpty(),
    check('time', 'Time ir required')
      .not()
      .isEmpty(),
    check('effect', 'Effect ir required')
      .not()
      .isEmpty(),
    check('intensity', 'Intensity ir required')
      .not()
      .isEmpty(),
    check('title', 'Title ir required')
      .not()
      .isEmpty(),
    check('beforeColor', 'Before Color ir required')
      .not()
      .isEmpty(),
    check('color', 'Color ir required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let character = await Character.findById(req.params.id);

      if (character.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      if (!character) {
        return res.status(404).json({ msg: 'Character not found' });
      }

      //Pull out story
      const story = character.story.find(
        story => story.id === req.params.story_id
      );
      if (!story) {
        return res.status(404).json({ msg: 'Story does not exist' });
      }

      const storyIndex = character.story.indexOf(story);

      character.story.splice(storyIndex, 1, req.body);

      await character.save();

      res.json(character.story);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Character not found' });
      }

      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
