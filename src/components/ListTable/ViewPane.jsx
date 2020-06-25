import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RcpForm from '../../components/forms/RcpForm';
import ApvForm from '../../components/forms/ApvForm';
import CdvForm from '../../components/forms/CdvForm';

export default function ViewPane(props) {
  const { data, onEditClick, onCloseClick } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Typography gutterBottom className={classes.header} variant="body1" component="span">{data.rcp_item}</Typography>
          <Button onClick={onEditClick} variant="text" color="secondary">Edit</Button>
        </Box>
        <IconButton onClick={onCloseClick} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <RcpForm disabled initialValues={data} />
      <ApvForm disabled initialValues={data} />
      <CdvForm disabled initialValues={data} />
    </Paper>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    divider: {
      marginBottom: theme.spacing(1)
    },
    header: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontWeight: 'bold',
    },
  }),
);