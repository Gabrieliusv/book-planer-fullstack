import React, { useState, useEffect } from 'react';
import {
  AppBar,
  CssBaseline,
  Icon,
  Tooltip,
  Toolbar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import AddCharacter from './AddCharacter';
import Trash from './Trash';
import ConfirmDel from './ConfirmDel';
import CharInfoDisplay from './CharInfoDisplay';
import EditCharacter from './EditCharacter';
import CharactersOverview from './CharactersOverview';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import {
  getCharacters,
  deleteCharacter
} from '../../redux/actions/characterActions';
import {
  toggleAddCharacter,
  toggleTrash,
  openDeleteNotification,
  openEditCharacter,
  openCharacter,
  closeCharacter
} from '../../redux/actions/navigationActions';
import PropTypes from 'prop-types';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#36393e',
    color: 'white'
  },
  content: {
    flexGrow: 1,
    margin: theme.spacing(4),
    width: `calc(100% - ${drawerWidth}px)`
  },
  list: {
    padding: 0
  },
  listItem: {
    padding: theme.spacing(1),
    wordBreak: 'break-word'
  },
  divider: {
    backgroundColor: '#fff'
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

function CustomNav({
  navigation: {
    editCharacterWindow,
    deleteNotificationWindow,
    trashWindow,
    addCharacterWindow,
    characterInfoWindow,
    charactersOverviewWindow
  },
  container,
  toggleAddCharacter,
  toggleTrash,
  deleteCharacter,
  getCharacters,
  openDeleteNotification,
  openEditCharacter,
  openCharacter,
  closeCharacter,
  logout,
  characters: { charactersInfo },
  auth: { isAuthenticated }
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  /*useEffect(() => {
    getCharacters();
  }, [getCharacters]);*/

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const handleOpenEditCharacter = (i, index) => {
    const data = { open: true, index: index, character: { ...i } };
    openEditCharacter(data);
  };

  const handleDelete = (i, index) => {
    deleteCharacter(i._id);
    const a = { open: true, char: i, index: index };
    openDeleteNotification(a);
  };

  const handleSelectChar = id => {
    openCharacter(id);
  };

  const handleCharactersOverview = () => {
    closeCharacter();
    setMobileOpen(false);
  };

  const handleProfile = event => {
    setAnchorEl(event.currentTarget);
  };

  function handleProfileClose() {
    setAnchorEl(null);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={handleCharactersOverview}>
          <ListItemText primary='Storylines overview' />
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <List className={classes.list}>
        {charactersInfo.length > 0 &&
          charactersInfo.map((i, index) => (
            <ListItem
              button
              key={i._id}
              onClick={() => handleSelectChar(i._id)}
            >
              <ListItemText primary={i.name} className={classes.listItem} />
              {i._id !== characterInfoWindow ? null : (
                <>
                  <Tooltip title='Edit'>
                    <IconButton
                      aria-label='Edit'
                      onClick={() => handleOpenEditCharacter(i, index)}
                    >
                      <Icon>edit_icon</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <IconButton
                      aria-label='Delete'
                      onClick={() => handleDelete(i, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        <ListItem button key={'addCharacter'} onClick={toggleAddCharacter}>
          <ListItemIcon>
            <AddCircle />
          </ListItemIcon>
          <ListItemText primary={'Add Character'} />
        </ListItem>
        <ListItem button key={'trash'} onClick={toggleTrash}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={'Trash'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' color='secondary' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open-drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
            onClose={handleProfileClose}
          >
            <MenuItem>
              <Link className={classes.link} to='/profile'>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>My account</MenuItem>
            <MenuItem onClick={handleProfileClose}>Discussions</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {!addCharacterWindow ? null : <AddCharacter />}
        {!trashWindow ? null : <Trash />}
        {!deleteNotificationWindow.open ? null : <ConfirmDel />}
        {!editCharacterWindow.open ? null : <EditCharacter />}
        <div className={classes.toolbar} />
        {characterInfoWindow === false ? null : <CharInfoDisplay />}
        {!charactersOverviewWindow ? null : <CharactersOverview />}
      </main>
    </div>
  );
}

CustomNav.propTypes = {
  getCharacters: PropTypes.func.isRequired,
  deleteCharacter: PropTypes.func.isRequired,
  toggleAddCharacter: PropTypes.func.isRequired,
  toggleTrash: PropTypes.func.isRequired,
  characters: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  openDeleteNotification: PropTypes.func.isRequired,
  openEditCharacter: PropTypes.func.isRequired,
  openCharacter: PropTypes.func.isRequired,
  closeCharacter: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  characters: state.characters,
  navigation: state.navigation,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCharacters,
    deleteCharacter,
    toggleAddCharacter,
    toggleTrash,
    openDeleteNotification,
    openEditCharacter,
    openCharacter,
    closeCharacter,
    logout
  }
)(CustomNav);
