import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Detail from '../../../components/forms/Detail';
import { parseCurrency } from '../../../utils';

function CdvListItem(props) {
  const { data } = props;
  const typographyProps = {
    component: 'div'
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={data.rcp_item}
          primaryTypographyProps={typographyProps}
          secondary={
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Detail data={data} field="rcp_payee" />
                <Detail data={data} field="rcp_dateDue" />
                <Detail data={data} field="apv_no" />
                <Detail data={data} field="apv_dateTransaction" />
              </Grid>
              <Grid item xs={6}>
                <Detail data={data} field="rcp_amtPeso" />
                <Detail data={data} field="rcp_amtDollar" />
              </Grid>
            </Grid>
          }
          secondaryTypographyProps={typographyProps}
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
}

export default function CdvList(props) {
  const { rows = [] } = props;
  const classes = useStyles();

  function getTotalPeso() {
    return rows.reduce((sum, r) => sum + parseCurrency(r.rcp_amtPeso), 0);
  }

  function getTotalDollar() {
    return rows.reduce((sum, r) => sum + parseCurrency(r.rcp_amtDollar), 0);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Detail
            variant="body1"
            field="rcp_amtPeso"
            data={{ rcp_amtPeso: getTotalPeso() }}
          />
          <Detail
            variant="body1"
            field="rcp_amtDollar"
            data={{ rcp_amtDollar: getTotalDollar() }}
          />
        </Grid>
      </Grid>
      <Divider />
      <List className={classes.root}>
        {rows.map(r => <CdvListItem key={r.rcp_item} data={r} />)}
      </List>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
