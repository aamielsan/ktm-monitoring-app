import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LABEL_MAP as Label } from './constants';

function Detail(props) {
  const { data, field } = props;
  const classes = useStyles();
  const label = Label[field] || field;

  return (
    <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
      <Typography gutterBottom className={classes.label} variant="body2" component="span">{label}</Typography>
      <Typography gutterBottom variant="body2" component="span">{data[field] || '-'}</Typography>
    </Box>
  );
}

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
      <Divider className={classes.divider} />
      <Detail data={data} field='rcp_payee' />
      <Detail data={data} field='rcp_invoiceRef' />
      <Detail data={data} field='rcp_amtPeso' />
      <Detail data={data} field='rcp_amtDollar' />
      <Detail data={data} field='rcp_particulars' />
      <Detail data={data} field='rcp_dateDue' />
      <Detail data={data} field='rcp_dateTransmitted' />
      {/**APV**/}
      <Typography className={classes.labelDivider} variant="subtitle1">APV</Typography>
      <Divider className={classes.divider} />
      <Detail data={data} field='apv_dateTransaction' />
      <Detail data={data} field='apv_no' />
      <Detail data={data} field='apv_remarks' />
      <Detail data={data} field='apv_dateTransmitted' />
      <Detail data={data} field='apv_receivedBy' />
      {/**CDV**/}
      <Typography className={classes.labelDivider} variant="subtitle1">CDV</Typography>
      <Divider className={classes.divider} />
      <Detail data={data} field='cdv_dateTransaction' />
      <Detail data={data} field='cdv_no' />
      <Detail data={data} field='cdv_checkNo' />
      <Detail data={data} field='cdv_status' />
      <Detail data={data} field='cdv_checkStatus' />
      <Detail data={data} field='cdv_datePayment' />
      <Detail data={data} field='updatedBy' />
    </Paper>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
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
    label: {
      marginRight: theme.spacing(1),
    },
    labelDivider: {
      marginTop: theme.spacing(1)
    },
  }),
);
