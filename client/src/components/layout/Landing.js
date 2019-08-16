import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../images/book.jpg';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@material-ui/core';

const appBar = 66;

const useStyles = makeStyles(theme => ({
  landing: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    position: 'relative',
    height: `calc(100vh - ${appBar}px)`
  },
  container: {
    width: '100%',
    height: '100%',
    margin: 0
  },
  paper: {
    background: 'rgba(241, 241, 239, 0.7)'
  },
  containerItem: {
    maxHeight: 800,
    maxWidth: 500
  }
}));

const Landing = () => {
  const classes = useStyles();

  const handleChange = () => {};

  const handleLogin = () => {};

  const CustomButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText('#88B4E3'),
      margin: theme.spacing(3),
      backgroundColor: '#88B4E3',
      '&:hover': {
        backgroundColor: '#6595DA'
      }
    }
  }))(Button);

  return (
    <div className={classes.landing}>
      <Grid
        container
        className={classes.container}
        spacing={7}
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12} sm={6} className={classes.containerItem}>
          <Paper elevation={2} className={classes.paper}>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            >
              <Typography variant='h6'> Book Planner Features</Typography>

              <Typography variant='body1'>Plan your book characters</Typography>

              <Typography variant='body1'> Create Storylines</Typography>

              <Typography variant='body1'>
                Overview created story arcs
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.containerItem}>
          <Paper elevation={2} className={classes.paper}>
            <Box p={2}>
              <Typography variant='h6' align='center'>
                Create a New Account
              </Typography>
              <form>
                <TextField
                  id='register-name'
                  label='Name'
                  onChange={handleChange('name')}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='register-email'
                  label='Email'
                  onChange={handleChange('name')}
                  type='email'
                  name='email'
                  autoComplete='email'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  id='register-password'
                  label='Password'
                  onChange={handleChange('name')}
                  type='password'
                  autoComplete='current-password'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />

                <CustomButton variant='contained' onClick={handleLogin}>
                  Sign up
                </CustomButton>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
