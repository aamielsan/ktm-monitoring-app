import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useFetchData from "../../hooks/useFetchData";
import useSheetId from "../../hooks/useSheetId";
import RCPTable from './RCPTable';
import RCPPane from './RCPPane';
import RCPDialog from './RCPDialog/index.jsx';

function RCPContainer() {
  const classes = useStyles();
  const [ showView, setShowView ] = useState(false);
  const [ viewData, setViewData ] = useState({});
  const [ showDialog, setShowDialog ] = useState(false);
  const [ dialogData, setDialogData ] = useState({});

  const [ sheetId ] = useSheetId();
  const { rows } = useFetchData(sheetId);

  function handleTableRowClick(_, row) {
    setViewData(row);
    setShowView(true);
  }

  function handleTableAddClick() {
    setShowDialog(true);
    setDialogData({});
  }

  function handlePaneEditClick() {
    setShowDialog(true);
    setDialogData(viewData);
  }

  function handlePaneCloseClick() {
    setShowView(false);
    setViewData({});
  }

  function handleDialogClose() {
    setShowDialog(false);
    setDialogData({});
  }

  function renderPane() {
    if (!showView) {
      return null;
    }

    return (
      <Grid item className={classes.item} xs={12} md={4}>
        <RCPPane data={viewData} onEditClick={handlePaneEditClick} onCloseClick={handlePaneCloseClick} />
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.item} xs={12} md={showView ? 8 : 12}>
        <RCPTable rows={rows} onAddClick={handleTableAddClick} onRowClick={handleTableRowClick} />
      </Grid>
      {renderPane()}
      <RCPDialog open={showDialog} onClose={handleDialogClose} data={dialogData} />
    </Grid>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    item: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
  }),
);

export default RCPContainer;
