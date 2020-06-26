import React, { useState } from 'react';
import PendingSignatureTable from './PendingSignatureTable';
import RefreshFab from '../../../components/RefreshFab';
import AddFab from '../../../components/AddFab';
import useRefresh from '../../../hooks/useRefresh';
import PaymentAddDialog from '../PaymentAddDialog';
import PaymentEditDialog from '../PaymentEditDialog';
import { CDV_CHECK_STAT_FRELEASE } from '../../../constants';

export default function PendingSignature() {
  const [ refresh, setRefresh ] = useRefresh();
  const [ isAddVisible, setIsAddVisible ] = useState(false);
  const [ isEditVisible, setIsEditVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});
  const [ selectedRows, setSelectedRows ] = useState([]);

  function handleRefreshClick() {
    setRefresh(true, () => setRefresh(false));
  }

  function handleAddClick() {
    setIsAddVisible(true);
  }

  function handleAddClose() {
    setIsAddVisible(false);
  }

  function handleEditClick(_, data) {
    setEditData(data);
    setIsEditVisible(true);
  }

  function handleEditClose() {
    setEditData({});
    setIsEditVisible(false);
  }

  function handleSelectionChange(rows) {
    setSelectedRows(rows);
  }

  return (
    <>
      <RefreshFab disabled={refresh} onClick={handleRefreshClick} />
      <AddFab disabled={!selectedRows.length} onClick={handleAddClick} />
      <PendingSignatureTable
        refresh={refresh}
        onEditClick={handleEditClick}
        onSelectionChange={handleSelectionChange}
      />
      <PaymentAddDialog
        open={isAddVisible}
        rows={selectedRows}
        onClose={handleAddClose}
        initialValues={{
          cdv_datePayment: null,
          cdv_checkStatus: CDV_CHECK_STAT_FRELEASE,
        }}
      />
      <PaymentEditDialog
        data={editData}
        open={isEditVisible}
        onClose={handleEditClose}
      />
    </>
  );
}
