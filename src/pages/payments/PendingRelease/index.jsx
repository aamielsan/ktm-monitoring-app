import React, { useState } from 'react';
import PendingReleaseTable from './PendingReleaseTable';
import useRefresh from '../../../hooks/useRefresh';
import AddFab from '../../../components/AddFab';
import RefreshFab from '../../../components/RefreshFab';
import PaymentAddDialog from '../PaymentAddDialog';
import PaymentEditDialog from '../PaymentEditDialog';
import { CDV_CHECK_STAT_RELEASED } from '../../../constants';

export default function PendingRelease() {
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
      <PendingReleaseTable
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
          cdv_checkStatus: CDV_CHECK_STAT_RELEASED,
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
