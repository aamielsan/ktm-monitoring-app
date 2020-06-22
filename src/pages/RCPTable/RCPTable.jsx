import React, { forwardRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
import { LABEL_MAP as Label } from './constants';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function RCPTable(props) {
  const { rows, onRowClick, onAddClick } = props;

  return (
    <>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={onAddClick}>Add</Button>
      </Box>
      <MaterialTable
        title="RCP Monitoring"
        data={rows}
        icons={tableIcons}
        onRowClick={onRowClick}
        columns={[
          { title: Label["rcp_item"], field: "rcp_item" },
          { title: Label["rcp_payee"], field: "rcp_payee" },
          { title: Label["rcp_invoiceRef"], field: "rcp_invoiceRef" },
          { title: Label["rcp_amtPeso"], field: "rcp_amtPeso", type: "numeric" },
          { title: Label["rcp_amtDollar"], field: "rcp_amtDollar", type: "numeric" },
          { title: Label["rcp_particulars"], field: "rcp_particulars" },
          { title: Label["rcp_dateDue"], field: "rcp_dateDue", type: "date" },
        ]}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
          actionsColumnIndex: -1,
        }}
      />
    </>
  );
}

export default RCPTable;
