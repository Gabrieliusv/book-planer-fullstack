const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post('/', auth, async (req, res) => {
  const { location, bio, youtube, twitter, facebook, instagram } = req.body;

  // Build Profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;
  if (location) profileFields.location = location;

  profileFields.social = [];
  if (youtube) profileFields.social.push({ name: 'Youtube', link: youtube });
  if (twitter) profileFields.social.push({ name: 'Twitter', link: twitter });
  if (facebook) profileFields.social.push({ name: 'Facebook', link: facebook });
  if (instagram)
    profileFields.social.push({ name: 'Instagram', link: instagram });

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    //Update profile
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    //Create Profile
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.sratus(500).send('server Error');
  }
});

//@route DELETE api/profile
//@desc Delete current users profile
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
