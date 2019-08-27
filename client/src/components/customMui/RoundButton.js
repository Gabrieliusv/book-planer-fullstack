import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const RoundButton = withStyles(theme => ({
  root: {
    borderRadius: '50%',
    height: '60px',
    margin: theme.spacing(2)
  }
}))(Button);

export default RoundButton;
