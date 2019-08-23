import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, TextField, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createProfile } from '../../redux/actions/profileActions';
import { profileNav } from '../../redux/actions/navigationActions';

const useStyles = makeStyles(theme => ({
  profilePaper: {
    maxWidth: '600px',
    minHeight: '140px',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15
  },
  spacing: {
    margin: theme.spacing(1)
  },
  marginTop: {
    marginTop: theme.spacing(1)
  }
}));

const AddProfile = ({ profileNav, createProfile }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = () => {
    createProfile(formData);
    profileNav('display');
  };

  return (
    <Paper elevation={5} className={classes.profilePaper}>
      <Typography variant='h5' align='center'>
        Create a New Profile
      </Typography>
      <TextField
        className={classes.spacing}
        id='profile-bio'
        label='About me'
        onChange={e => handleChange(e)}
        name='bio'
        value={formData.bio}
        variant='outlined'
        fullWidth
        multiline
        rows='4'
      />
      <TextField
        className={classes.spacing}
        id='profile-location'
        label='Location'
        onChange={e => handleChange(e)}
        name='location'
        value={formData.location}
        variant='outlined'
        fullWidth
      />
      <Box className={classes.marginTop}>
        <Typography variant='h6'>Social Links</Typography>
      </Box>
      <TextField
        className={classes.spacing}
        id='profile-youtube'
        label='Youtube'
        onChange={e => handleChange(e)}
        name='youtube'
        value={formData.youtube}
        variant='outlined'
        fullWidth
      />
      <TextField
        className={classes.spacing}
        id='profile-twitter'
        label='Twitter'
        onChange={e => handleChange(e)}
        name='twitter'
        value={formData.twitter}
        variant='outlined'
        fullWidth
      />
      <TextField
        className={classes.spacing}
        id='profile-facebook'
        label='Facebook'
        onChange={e => handleChange(e)}
        name='facebook'
        value={formData.facebook}
        variant='outlined'
        fullWidth
      />
      <TextField
        className={classes.spacing}
        id='profile-instagram'
        label='Instagram'
        onChange={e => handleChange(e)}
        name='instagram'
        value={formData.instagram}
        variant='outlined'
        fullWidth
      />
      <Box>
        <Button
          variant='contained'
          color='primary'
          className={classes.spacing}
          onClick={handleCreate}
        >
          Create a profile
        </Button>
        <Button
          className={classes.spacing}
          color='primary'
          variant='contained'
          onClick={() => profileNav('display')}
        >
          Go Back
        </Button>
      </Box>
    </Paper>
  );
};

AddProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile, profileNav }
)(AddProfile);
