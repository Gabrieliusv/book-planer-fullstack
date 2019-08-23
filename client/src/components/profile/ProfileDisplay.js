import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Box, Button, Container } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  profilePaper: {
    maxWidth: '600px',
    minWidth: '60vw',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  spacing: {
    margin: theme.spacing(1)
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

const ProfileDisplay = ({ profile, toggleEdit }) => {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={5} className={classes.profilePaper}>
        <Box className={classes.accountBox}>
          <AccountBox className={classes.icon} />
          <Box>
            <Button variant='contained' color='primary' onClick={toggleEdit}>
              Edit profile
            </Button>
          </Box>
        </Box>
        <Box m={2} className={classes.about}>
          {profile.bio && (
            <>
              <Typography variant='h6'>About me</Typography>
              <Typography variant='body1'>{profile.bio}</Typography>
            </>
          )}
          {profile.location && (
            <>
              <Typography className={classes.marginTop} variant='h6'>
                Location
              </Typography>
              <Typography variant='body1'>{profile.location}</Typography>
            </>
          )}
          {profile.social.length > 0 && (
            <Typography className={classes.marginTop} variant='h6'>
              Social links
            </Typography>
          )}
          {profile.social.length > 0 &&
            profile.social.map(i => (
              <>
                <Typography key={i.name} variant='body1'>
                  {i.link}
                </Typography>
              </>
            ))}
        </Box>
      </Paper>
    </>
  );
};

ProfileDisplay.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {}
)(ProfileDisplay);
