import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
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
    horizontalList: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    },
    listItem: {
      color: theme.palette.secondary.main,
    },
    selected: {
      borderBottomStyle: "solid",
      borderBottomWidth: "medium",
    },
  }),
);

function LinkItem(props) {
  const classes = useStyles();
  return (
    <ListItem
      exact
      button
      to={props.to}
      component={NavLink}
      className={classes.listItem}
      activeClassName={classes.selected}
    >
      <ListItemText
        primary={props.label}
      />
    </ListItem>
  );
}

export  default function Container(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img alt="logo" src={logo} width={90} />
          <Divider light className={classes.divider} orientation="vertical" flexItem />
          <List className={classes.horizontalList}>
            <LinkItem
              to='/'
              label='RCP'
            />
            <LinkItem
              to='/apv'
              label='APV'
            />
            <LinkItem
              to='/cdv'
              label='CDV'
            />
          </List>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {props.children}
      </div>
    </div>
  );
}
