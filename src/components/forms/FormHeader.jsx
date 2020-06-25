import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export default function FormHeader(props) {
  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <Typography className={!children ? '' : classes.labelDivider} variant="subtitle1">{children || ''}</Typography>
      <Divider className={classes.divider} />
    </>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    divider: {
      marginBottom: theme.spacing(1)
    },
    labelDivider: {
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: theme.spacing(2)
    },
  }),
);

