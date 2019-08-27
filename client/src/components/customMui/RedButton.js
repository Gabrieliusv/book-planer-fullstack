import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const RedButton = withStyles(theme => ({
  root: {
    color: '#E55B59',
    borderColor: '#E55B59',
    '&:hover': {
      backgroundColor: '#FFE0DF'
    }
  }
}))(Button);

export default RedButton;
