import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  Divider,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery
} from '@material-ui/core';
import RedButton from '../customMui/RedButton';
import BlueButton from '../customMui/BlueButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTrash } from '../../redux/actions/navigationActions';
import {
  deleteTrash,
  restoreCharacter
} from '../../redux/actions/characterActions';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function Trash(props) {
  const { toggleTrash, deleteTrash, restoreCharacter } = props;
  const { trashWindow } = props.navigation;
  const { inTrash } = props.characters;
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [checked, setChecked] = useState([]);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleDelete = () => {
    if (checked.length === 0) {
      return;
    } else {
      deleteTrash(checked);
      setChecked([]);
    }
  };

  const handleRestore = () => {
    if (checked.length === 0) {
      return;
    } else {
      restoreCharacter(checked);
      setChecked([]);
    }
  };

  const handleToggleAll = items => {
    if (checked.length === items.length) {
      setChecked([]);
    } else {
      setChecked(items);
    }
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            color='primary'
            onClick={() => handleToggleAll(items)}
            checked={checked.length === items.length && items.length !== 0}
            indeterminate={
              checked.length !== items.length && checked.length !== 0
            }
            disabled={items.length === 0}
          />
        }
        title={title}
        subheader={`${checked.length}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense>
        {items.map(value => (
          <ListItem
            key={inTrash.indexOf(value)}
            button
            onClick={() => handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                color='primary'
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}

        <ListItem />
      </List>
    </Card>
  );

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={trashWindow}
        onClose={toggleTrash}
        maxWidth={'lg'}
        aria-labelledby='trash-bin'
      >
        <DialogTitle id='trash-bin'>{'Trash'}</DialogTitle>
        <DialogContent>
          {inTrash.length === 0 ? (
            <DialogContentText>No characters in Trash.</DialogContentText>
          ) : (
            customList('Characters', inTrash)
          )}
        </DialogContent>
        <DialogActions>
          {inTrash.length === 0 ? null : (
            <>
              <BlueButton onClick={handleRestore}>Restore</BlueButton>
              <RedButton onClick={handleDelete}>Delete</RedButton>
            </>
          )}
          <BlueButton onClick={toggleTrash}>Close</BlueButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Trash.propTypes = {
  toggleTrash: PropTypes.func.isRequired,
  deleteTrash: PropTypes.func.isRequired,
  restoreCharacter: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  characters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  navigation: state.navigation,
  characters: state.characters
});

export default connect(
  mapStateToProps,
  { toggleTrash, deleteTrash, restoreCharacter }
)(Trash);
