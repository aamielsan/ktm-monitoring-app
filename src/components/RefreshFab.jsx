import React from "react";
import Fab from "@material-ui/core/Fab";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function RefreshFab(props) {
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      {...props}
      aria-label="refresh"
      className={classes.fab}
    >
      <RefreshIcon />
    </Fab>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      zIndex: theme.zIndex.drawer + 1,
      top: theme.spacing(4),
      right: theme.spacing(3),
      position: "fixed"
    }
  })
);
