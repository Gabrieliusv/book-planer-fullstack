import React from 'react';
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

const appBar = 57;

const useStyles = makeStyles(theme => ({
  landing: {
    backgroundImage: `url(${Image1})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100vw'
  },
  container: {
    width: '100%',
    minHeight: `calc(100vh - ${appBar}px)`,
    paddingTop: theme.spacing(4)
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
        spacing={2}
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
