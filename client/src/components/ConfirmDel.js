import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDeleteNotification, closeCharacter } from '../redux/actions/navigationActions';
import { restoreCharacterAtIndex } from '../redux/actions/characterActions';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function ConfirmDel(props) {
  const classes = useStyles();
  const { closeDeleteNotification, restoreCharacterAtIndex, closeCharacter } = props;
  const { deleteNotificationWindow } = props.navigation;

  useEffect(() => {
    closeCharacter();
  }, [closeCharacter])

  const handleUndo = (i, index) => {
    restoreCharacterAtIndex(i, index);
    closeDeleteNotification();
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={deleteNotificationWindow.open}
        autoHideDuration={2000}
        onClose={closeDeleteNotification}
        ContentProps={{
          'aria-describedby': 'delete-message',
        }}
        message={<span id="delete-message">Character moved to Trash.</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={() => handleUndo(deleteNotificationWindow.char, deleteNotificationWindow.index)}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={closeDeleteNotification}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </>
  );
}

ConfirmDel.propTypes = {
  closeDeleteNotification: PropTypes.func.isRequired,
  restoreCharacterAtIndex: PropTypes.func.isRequired,
  closeCharacter: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  navigation: state.navigation
})

export default connect(mapStateToProps, { closeDeleteNotification, restoreCharacterAtIndex, closeCharacter })(ConfirmDel);