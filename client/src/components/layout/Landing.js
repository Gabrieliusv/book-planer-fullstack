import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image1 from '../images/book.jpg';
import Image2 from '../images/pc-mobile.png';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@material-ui/core';

const appBar = 64;

const useStyles = makeStyles(theme => ({
  landing: {
    backgroundImage: `url(${Image1})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100%'
  },
  container: {
    width: '100%',
    minHeight: `calc(100vh - ${appBar}px)`,
    paddingTop: theme.spacing(4),
    margin: 0
  },
  paper: {
    background: 'rgba(241, 241, 239, 0.7)'
  },
  showcase: { maxWidth: 700 },
  signup: {
    maxHeight: 800,
    maxWidth: 450
  },
  img: {
    width: '100%'
  },
  alert: {
    margin: theme.spacing(1)
  }
}));

const Landing = () => {
  const classes = useStyles();
  const [requiredField, setRequiredField] = useState(false);
  const [match, setMatch] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    const isEmpty = Object.values(formData).some(x => x === '');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isEmpty) {
      setRequiredField(formData);
    } else if (password !== password2) {
      setMatch(false);
    } else if (!regex.test(email)) {
      setEmailValidation(false);
    } else {
      console.log(formData);
    }
  };

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
        spacing={4}
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={11} sm={9} md={7} lg={7} className={classes.showcase}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Box p={1}>
              <Typography variant='h6' align='center'>
                Start Writing your book today!
              </Typography>
              <Typography variant='subtitle2' align='center'>
                The book planner will help you plan your next novel, characters
                and storylines. It provides a graphical overview of character's
                storyline for easier story planing.
              </Typography>
            </Box>
            <img className={classes.img} src={Image2} alt='pc mobile view' />
          </Grid>
        </Grid>
        <Grid item xs={11} sm={7} md={5} lg={5} className={classes.signup}>
          <Paper elevation={2} className={classes.paper}>
            <Box p={2}>
              <Typography variant='h6' align='center'>
                Create a New Account
              </Typography>
              <form>
                <TextField
                  error={requiredField.name === ''}
                  id='register-name'
                  label='Name'
                  onChange={e => handleChange(e)}
                  type='name'
                  autoComplete='name'
                  name='name'
                  value={name}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  error={requiredField.email === '' || !emailValidation}
                  id='register-email'
                  label='Email'
                  onChange={e => handleChange(e)}
                  type='email'
                  name='email'
                  value={email}
                  autoComplete='email'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
                {emailValidation || requiredField.email === '' ? null : (
                  <Typography
                    variant='subtitle2'
                    color='error'
                    className={classes.alert}
                  >
                    Invalid email address
                  </Typography>
                )}
                <TextField
                  error={requiredField.password === '' || !match}
                  id='register-password'
                  label='Password'
                  onChange={e => handleChange(e)}
                  type='password'
                  name='password'
                  value={password}
                  autoComplete='password'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  error={requiredField.password2 === '' || !match}
                  id='register-confirm-password'
                  label='Confirm Password'
                  onChange={e => handleChange(e)}
                  type='password'
                  name='password2'
                  autoComplete='password'
                  value={password2}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
                {match ? null : (
                  <Typography
                    variant='subtitle2'
                    color='error'
                    className={classes.alert}
                  >
                    Passwords do not match
                  </Typography>
                )}
                <CustomButton variant='contained' onClick={handleRegister}>
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
