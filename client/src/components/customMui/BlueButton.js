import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const BlueButton = withStyles(theme => ({
  root: {
    color: '#3697b0',
    borderColor: '#3697b0',
    '&:hover': {
      backgroundColor: '#E7F0F9'
    }
  }
}))(Button);

export default BlueButton;
