import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton
} from '@material-ui/core';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#2e3136'
  },
  title: {
    flexGrow: 1
  },
  profileMenu: {
    marginTop: 35
  },
  link: {
    textDecoration: 'none',
    color: '#000'
  }
}));

const Navbar = ({ logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfile = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title} noWrap>
            Book Planner
          </Typography>
          <IconButton
            color='inherit'
            aria-controls='profile-menu'
            aria-haspopup='true'
            onClick={handleProfile}
          >
            <ProfileIcon />
          </IconButton>
          <Menu
            id='profile-menu'
            className={classes.profileMenu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Link className={classes.link} to='/dashboard'>
                Book Planner
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className={classes.link} to='/profile'>
                Profile
              </Link>
            </MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Discussions</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {};

export default connect(
  null,
  { logout }
)(Navbar);
