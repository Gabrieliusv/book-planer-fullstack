import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomProgress = () => {
  const Progress = withStyles({
    root: {
      color: '#83ade0'
    }
  })(CircularProgress);

  return (
    <Box p={4} display='flex' justifyContent='center'>
      <Progress />
    </Box>
  );
};

export default CustomProgress;
