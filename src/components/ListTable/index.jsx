import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListTable from './ListTable';
import ViewPane from './ViewPane';

function ListTableContainer(props) {
  const { rows, columns, title, loading, selection, onEditClick, onSelectionChange } = props;

  const classes = useStyles();
  const [ showView, setShowView ] = useState(false);
  const [ viewData, setViewData ] = useState({});

  function handleTableRowClick(_, row) {
    setViewData(row);
    setShowView(true);
  }

  function handlePaneCloseClick() {
    setShowView(false);
    setViewData({});
  }

  function handlePaneEditClick(e) {
    onEditClick && onEditClick(e, viewData);
  }

  function renderPane() {
    if (!showView) {
      return null;
    }

    return (
      <Grid item className={classes.item} xs={12} md={4}>
        <ViewPane data={viewData} onEditClick={handlePaneEditClick} onCloseClick={handlePaneCloseClick} />
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.item} xs={12} md={showView ? 8 : 12}>
        <ListTable
          style={{
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column',
          }}
          selection={selection}
          title={title}
          loading={loading}
          rows={rows}
          columns={columns}
          onRowClick={handleTableRowClick}
          onSelectionChange={onSelectionChange}
        />
      </Grid>
      {renderPane()}
    </Grid>
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    item: {
      height: `calc(100vh - 72px - ${theme.spacing(2)}px)`,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
  }),
);

export default ListTableContainer;
