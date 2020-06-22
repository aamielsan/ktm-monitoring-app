import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export default function RCPPrompt(props) {
  const { initialValue, onSubmit } = props;
  const classes = useStyles();
  const [ value, setValue ] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClick(e) {
    onSubmit && onSubmit(e, value);
  }

  return (
    <Box display="flex" flex="1" justifyContent="center" alignItems="center">
      <Paper className={classes.paper}>
        <TextField value={value} onChange={handleChange} style={{ marginRight: '8px' }} label="Sheet ID" variant="outlined" />
        <Button variant="contained" color="secondary" onClick={handleClick}>Submit</Button>
      </Paper>
    </Box>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      display: 'flex',
      padding: theme.spacing(2)
    },
  }),
);
