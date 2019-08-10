const express = require('express');
const router = express.Router();

//story Model
//const Story = require('../../models/Story');

//@route GET api/story
//@desc Get All storys
//@access Public
router.get('/', (req, res) => res.send('Story route')
);

module.exports = router;
