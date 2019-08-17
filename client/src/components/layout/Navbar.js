import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing(1)
  },

  form: {
    margin: 0,
    padding: 0,
    display: 'none',
    [theme.breakpoints.up(720)]: {
      display: 'block'
    }
  },
  title: {
    flexGrow: 1
  },
  mobile: {
    display: 'block',
    [theme.breakpoints.up(720)]: {
      display: 'none'
    }
  },
  nav: {
    backgroundColor: '#FDFEFB',
    opacity: 0.9
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [requiredField, setRequiredField] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    const isEmpty = Object.values(formData).some(x => x === '');
    if (isEmpty) {
      setRequiredField(formData);
    } else {
      console.log(formData);
    }
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleClose = () => {
    setLoginOpen(false);
    setRequiredField(false);
  };

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
              error={requiredField.email === ''}
              id='login-email'
              label='Email'
              className={classes.textField}
              margin='dense'
              type='email'
              name='email'
              value={email}
              onChange={e => handleChange(e)}
              autoComplete='email'
              variant='outlined'
            />
            <TextField
              error={requiredField.password === ''}
              id='login-password'
              label='Password'
              className={classes.textField}
              type='password'
              name='password'
              value={password}
              onChange={e => handleChange(e)}
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
            onClick={handleLoginOpen}
          >
            Log In
          </CustomButton>
        </Toolbar>
        <Dialog
          open={loginOpen}
          onClose={handleClose}
          aria-labelledby='mobile-form'
        >
          <DialogTitle id='mobile-form'>Log In</DialogTitle>
          <DialogContent>
            <form className={classes.dialogForm}>
              <TextField
                error={requiredField.email === ''}
                id='login-email'
                label='Email'
                margin='dense'
                type='email'
                name='email'
                value={email}
                onChange={e => handleChange(e)}
                autoComplete='email'
                variant='outlined'
                fullWidth
              />
              <TextField
                error={requiredField.password === ''}
                id='login-password'
                label='Password'
                type='password'
                name='password'
                value={password}
                onChange={e => handleChange(e)}
                autoComplete='current-password'
                margin='dense'
                variant='outlined'
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <CustomButton variant='contained' onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton variant='contained' onClick={handleLogin}>
              Log In
            </CustomButton>
          </DialogActions>
        </Dialog>
      </AppBar>
    </div>
  );
};

export default Navbar;
