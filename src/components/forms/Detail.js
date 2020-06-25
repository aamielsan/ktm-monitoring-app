import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LABEL_MAP as Label, TYPE_MAP as Type } from '../../constants';
import { formatValueByType } from '../../utils';

export default function Detail(props) {
  const { data, field, variant = "body2" } = props;
  const classes = useStyles();
  const label = Label[field] || field;
  const type = Type[field];
  const value = formatValueByType(data[field], type);

  return (
    <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
      <Typography gutterBottom className={classes.label} variant={variant} component="span">{label}</Typography>
      <Typography gutterBottom variant={variant} component="span">{value || '-'}</Typography>
    </Box>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    label: {
      marginRight: theme.spacing(1),
    },
  }),
);
