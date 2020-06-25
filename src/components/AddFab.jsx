import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function AddFab(props) {
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      {...props}
      aria-label="add"
      className={classes.fab}
    >
      <AddIcon />
    </Fab>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      zIndex: theme.zIndex.drawer + 1,
      top: theme.spacing(4),
      right: theme.spacing(13),
      position: "fixed"
    }
  })
);
