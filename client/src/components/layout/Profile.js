import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import CustomProgress from '../customMui/CustomProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import AddProfile from '../forms/AddProfile';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: '50px 90px',
    [theme.breakpoints.down('xs')]: {
      padding: '40px 2vw',
      alignItems: 'center'
    }
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  profilePaper: {
    maxWidth: '250px',
    minHeight: '140px',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15
  },
  icon: {
    width: '70px',
    height: '70px'
  },
  form: {
    minWidth: '100%'
  }
}));

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth
}) => {
  const classes = useStyles();
  const [createProfile, setCreateProfile] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      getCurrentProfile();
    }
  }, [auth.loading, getCurrentProfile]);

  const toggleCreate = () => {
    setCreateProfile(!createProfile);
  };

  return (
    <>
      <Navbar />
      <Grid container className={classes.grid} direction='column'>
        <Grid item>
          <Typography className={classes.title} variant='h4'>
            Profile
          </Typography>
          <Typography variant='h6'>{auth.user && auth.user.name}</Typography>
        </Grid>
        {loading ? (
          <CustomProgress />
        ) : profile === null && !createProfile ? (
          <Paper elevation={5} className={classes.profilePaper}>
            <AccountBox className={classes.icon} />
            <Typography align='center' variant='subtitle2'>
              You have not yet setup a profile
            </Typography>
            <Button variant='contained' color='primary' onClick={toggleCreate}>
              Create a profile
            </Button>
          </Paper>
        ) : createProfile ? (
          <Grid item className={classes.form}>
            <AddProfile toggleCreate={toggleCreate} />
          </Grid>
        ) : (
          <>
            <p>profile</p>
          </>
        )}
      </Grid>
    </>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
