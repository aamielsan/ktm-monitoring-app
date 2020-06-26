import React from 'react';
import useSheetId from '../../hooks/useSheetId';
import useFetchPendingRelease from '../../hooks/useFetchPendingRelease';
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
  { field: "apv_no", title: Label["apv_no"] },
  { title: Label["apv_dateTransaction"], type: "date", render: r => formatValueByType(r.dateTransaction, Type["apvDateTransaction"]) },
  { field: "cdv_no", title: Label["cdv_no"] },
];

function PendingReleaseTable(props) {
  const { refresh, onSelectionChange, onEditClick } = props;
  const [ sheetId ] = useSheetId();
  const { rows, loading } = useFetchPendingRelease(sheetId, refresh);

  return (
    <ListTable
      title="Pending for Release"
      rows={rows}
      loading={loading}
      columns={columns}
      onEditClick={onEditClick}
      onSelectionChange={onSelectionChange}
    />
  );
}

export default PendingReleaseTable;
