import React, { useState } from 'react';
import CdvTable from './CdvTable';
import CdvAddDialog from './CdvAddDialog';
import CdvEditDialog from './CdvEditDialog';
import AddFab from '../../components/AddFab';
import RefreshFab from '../../components/RefreshFab';
import useRefresh from '../../hooks/useRefresh';

export default function Cdv() {
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
      <CdvTable
        refresh={refresh}
        onEditClick={handleEditClick}
        onSelectionChange={handleSelectionChange} 
      />
      <CdvAddDialog 
        open={isAddVisible}
        rows={selectedRows}
        onClose={handleAddClose}
      />
      <CdvEditDialog
        data={editData}
        open={isEditVisible}
        onClose={handleEditClose}
      />
    </>
  );
}
