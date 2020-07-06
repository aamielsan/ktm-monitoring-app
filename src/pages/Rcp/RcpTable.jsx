import React from "react";
import ListTable from "../../components/ListTable";
import useSheetId from "../../hooks/useSheetId";
import useFetchRcp from "../../hooks/useFetchRcp";
import { formatValueByType } from "../../utils";
import { LABEL_MAP as Label, TYPE_MAP as Type } from "../../constants";

const columns = [
  { field: "rcp_item", title: Label["rcp_item"] },
  { field: "rcp_payee", title: Label["rcp_payee"] },
  { field: "rcp_invoiceRef", title: Label["rcp_invoiceRef"] },
  {
    field: "rcp_amtPeso",
    title: Label["rcp_amtPeso"],
    type: "numeric",
    render: (r) => formatValueByType(r.rcp_amtPeso, Type["rcp_amtPeso"]),
  },
  {
    field: "rcp_amtDollar",
    title: Label["rcp_amtDollar"],
    type: "numeric",
    render: (r) => formatValueByType(r.rcp_amtDollar, Type["rcp_amtDollar"]),
  },
  {
    field: "rcp_dateDue",
    title: Label["rcp_dateDue"],
    type: "string",
    defaultSort: "desc",
    render: (r) => formatValueByType(r.rcp_dateDue, Type["rcp_dateDue"]),
  },
];

function RcpTable(props) {
  const { refresh, onEditClick } = props;
  const [sheetId] = useSheetId();
  const { rows, loading } = useFetchRcp(sheetId, refresh);

  console.log("rows", rows);

  return (
    <ListTable
      title="All RCP"
      loading={loading}
      rows={rows}
      columns={columns}
      onEditClick={onEditClick}
    />
  );
}

export default RcpTable;
