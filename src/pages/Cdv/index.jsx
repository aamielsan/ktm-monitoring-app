import React, { useState } from 'react';
import CdvTable from './CdvTable';
import CdvAddDialog from './CdvAddDialog';
import CdvEditDialog from './CdvEditDialog';
import AddFab from '../../components/AddFab';

export default function Cdv() {
  const [ isAddVisible, setIsAddVisible ] = useState(false);
  const [ isEditVisible, setIsEditVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});
  const [ selectedRows, setSelectedRows ] = useState([]);

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
      <AddFab disabled={!selectedRows.length} onClick={handleAddClick} />
      <CdvTable
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
