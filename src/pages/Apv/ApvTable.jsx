import React from 'react';
import useSheetId from '../../hooks/useSheetId';
import useFetchApv from '../../hooks/useFetchApv';
import ListTable from '../../components/ListTable';
import { formatValueByType } from '../../utils';
import { LABEL_MAP as Label, TYPE_MAP as Type } from '../../constants';

const columns = [
  { field: "rcp_item", title: Label["rcp_item"] },
  { field: "rcp_payee", title: Label["rcp_payee"] },
  { field: "rcp_invoiceRef", title: Label["rcp_invoiceRef"],  },
  { title: Label["rcp_amtPeso"], type: "numeric", render: r => formatValueByType(r.rcp_amtPeso, Type["rcp_amtPeso"]) },
  { title: Label["rcp_amtDollar"], type: "numeric", render: r => formatValueByType(r.rcp_amtDollar, Type["rcp_amtDollar"]) },
  { title: Label["rcp_dateDue"], type: "date", render: r => formatValueByType(r.rcp_dateDue, Type["rcp_dateDue"]) },
];

function ApvTable(props) {
  const { refresh, onEditClick } = props;
  const [ sheetId ] = useSheetId();
  const { rows, loading } = useFetchApv(sheetId, refresh);

  return (
    <ListTable
      title="Pending for APV"
      rows={rows}
      loading={loading}
      columns={columns}
      onEditClick={onEditClick}
    />
  );
}

export default ApvTable;
