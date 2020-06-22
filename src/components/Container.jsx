import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo3.png';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      margin: theme.spacing(2)
    },
    divider: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export  default function Container(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img alt="logo" src={logo} width={90} />
          <Divider light className={classes.divider} orientation="vertical" flexItem />
          <Typography variant="h6">
            Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {props.children}
      </div>
    </div>
  );
}
