import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Paper,
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  createProfile,
  deleteAccount
} from '../../redux/actions/profileActions';
import { profileNav } from '../../redux/actions/navigationActions';
import { removeAlert } from '../../redux/actions/alertActions';
import Alert from '../layout/Alert';

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
  },
  buttons: {
    display: 'flex',
    width: '100%'
  },
  left: {
    flexGrow: 1
  },
  red: {
    color: 'red'
  }
}));

const EditProfile = ({
  createProfile,
  deleteAccount,
  removeAlert,
  profileNav,
  profile: { profile }
}) => {
  const classes = useStyles();
  const [notification, seNotification] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  useEffect(() => {
    setFormData({
      location: !profile.location ? '' : profile.location,
      bio: !profile.bio ? '' : profile.bio,
      youtube:
        !profile.social || !profile.social.youtube
          ? ''
          : profile.social.youtube,
      twitter:
        !profile.social || !profile.social.twitter
          ? ''
          : profile.social.twitter,
      facebook:
        !profile.social || !profile.social.facebook
          ? ''
          : profile.social.facebook,
      instagram:
        !profile.social || !profile.social.instagram
          ? ''
          : profile.social.instagram
    });
  }, [profile.social, profile.location, profile.bio]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    createProfile(formData, true);
  };

  const handleBack = () => {
    profileNav('display');
    removeAlert();
  };

  const toggleNotification = () => {
    seNotification(!notification);
  };

  const handleDelete = () => {
    deleteAccount();
  };

  return (
    <Paper elevation={5} className={classes.profilePaper}>
      <Typography variant='h5' align='center'>
        Update Profile
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
      <Alert />
      <Box className={classes.buttons}>
        <Box className={classes.left}>
          <Button
            variant='contained'
            color='primary'
            className={classes.spacing}
            onClick={handleUpdate}
          >
            Save
          </Button>
          <Button
            className={classes.spacing}
            color='primary'
            variant='contained'
            onClick={handleBack}
          >
            Go Back
          </Button>
        </Box>
        <Button
          className={classes.spacing}
          color='secondary'
          variant='outlined'
          onClick={toggleNotification}
        >
          Delete account
        </Button>
      </Box>
      <Dialog
        open={notification}
        onClose={toggleNotification}
        aria-labelledby='delete'
        aria-describedby='delete-account'
      >
        <DialogTitle id='delete'>
          {'Do you really want to delete your account?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-account'>
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleNotification} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} className={classes.red} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profileNav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, deleteAccount, profileNav, removeAlert }
)(EditProfile);
