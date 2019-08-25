import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Box, Button } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { profileNav } from '../../redux/actions/navigationActions';

const useStyles = makeStyles(theme => ({
  profilePaper: {
    maxWidth: '600px',
    minHeight: '230px',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '60vw'
    }
  },
  marginTop: {
    marginTop: theme.spacing(1)
  },
  icon: {
    width: '170px',
    height: '170px',
    [theme.breakpoints.down('xs')]: {
      width: '130px',
      height: '130px'
    }
  },
  accountBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  about: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      width: '100%'
    }
  }
}));

const ProfileDisplay = ({ profile, profileNav }) => {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={5} className={classes.profilePaper}>
        <Box className={classes.accountBox}>
          <AccountBox className={classes.icon} />
          <Box>
            <Button
              variant='contained'
              color='primary'
              onClick={() => profileNav('editProfile')}
            >
              Edit profile
            </Button>
          </Box>
        </Box>
        <Box m={2} className={classes.about}>
          <Typography variant='h6'>About me</Typography>
          {profile.bio && (
            <Typography variant='body1'>{profile.bio}</Typography>
          )}
          {profile.location && (
            <>
              <Typography className={classes.marginTop} variant='h6'>
                Location
              </Typography>
              <Typography variant='body1'>{profile.location}</Typography>
            </>
          )}
          {profile.social.youtube ||
          profile.social.twitter ||
          profile.social.facebook ||
          profile.social.instagram ? (
            <Typography className={classes.marginTop} variant='h6'>
              Social links
            </Typography>
          ) : null}
          {profile.social.youtube && (
            <Typography variant='body1' className={classes.marginTop}>
              {profile.social.youtube}
            </Typography>
          )}
          {profile.social.twitter && (
            <Typography variant='body1' className={classes.marginTop}>
              {profile.social.twitter}
            </Typography>
          )}
          {profile.social.facebook && (
            <Typography variant='body1' className={classes.marginTop}>
              {profile.social.facebook}
            </Typography>
          )}
          {profile.social.instagram && (
            <Typography variant='body1' className={classes.marginTop}>
              {profile.social.instagram}
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

ProfileDisplay.propTypes = {
  profile: PropTypes.object.isRequired,
  profileNav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { profileNav }
)(ProfileDisplay);
