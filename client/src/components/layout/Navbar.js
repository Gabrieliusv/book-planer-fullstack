import React from 'react';
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
  title: {
    flexGrow: 1
  },
  profileMenu: {
    marginTop: 35
  },
  link: {
    margin: 0,
    textDecoration: 'none',
    color: '#000',
    width: '100%',
    padding: '12px 16px',
    fontWeight: 500
  },
  menuItem: {
    padding: 0,
    minHeight: 0
  },
  logout: {
    fontWeight: 500,
    color: '#6595DA'
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
      <AppBar color='secondary' position='static' className={classes.appBar}>
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
            <MenuItem className={classes.menuItem}>
              <Link className={classes.link} to='/dashboard'>
                Book planner
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Link className={classes.link} to='/profile'>
                Profile
              </Link>
            </MenuItem>
            <MenuItem className={classes.logout} onClick={logout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Navbar);
