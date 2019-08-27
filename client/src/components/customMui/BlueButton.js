import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const BlueButton = withStyles(theme => ({
  root: {
    color: '#6595DA',
    borderColor: '#6595DA',
    '&:hover': {
      backgroundColor: '#E7F0F9'
    }
  }
}))(Button);

export default BlueButton;
