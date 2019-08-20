import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const CustomButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#88B4E3'),
    margin: theme.spacing(1),
    backgroundColor: '#88B4E3',
    '&:hover': {
      backgroundColor: '#6595DA'
    }
  }
}))(Button);

export default CustomButton;
