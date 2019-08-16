import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 66
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  form: {
    display: 'none',
    [theme.breakpoints.up(750)]: {
      display: 'block'
    }
  },
  title: {
    flexGrow: 1
  },
  mobile: {
    display: 'block',
    [theme.breakpoints.up(750)]: {
      display: 'none'
    }
  },
  nav: {
    backgroundColor: '#FDFEFB'
  }
}));

const Navbar = () => {
  const classes = useStyles();

  const handleChange = () => {};

  const handleLogin = () => {};

  const CustomButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText('#88B4E3'),
      margin: theme.spacing(1),
      backgroundColor: '#88B4E3',
      '&:hover': {
        backgroundColor: '#6595DA'
      }
    }
  }))(Button);

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default' className={classes.nav}>
        <Toolbar>
          <Typography className={classes.title} variant='h6' color='inherit'>
            Book planner
          </Typography>
          <form className={classes.form}>
            <TextField
              id='login-email'
              label='Email'
              className={classes.textField}
              onChange={handleChange('name')}
              margin='dense'
              type='email'
              name='email'
              autoComplete='email'
              variant='outlined'
            />
            <TextField
              id='login-password'
              label='Password'
              className={classes.textField}
              onChange={handleChange('name')}
              type='password'
              autoComplete='current-password'
              margin='dense'
              variant='outlined'
            />
            <CustomButton variant='contained' onClick={handleLogin}>
              Log In
            </CustomButton>
          </form>
          <CustomButton
            className={classes.mobile}
            variant='contained'
            onClick={handleLogin}
          >
            Log In
          </CustomButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
