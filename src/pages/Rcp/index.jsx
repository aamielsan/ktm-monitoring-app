import React, { useState } from 'react';
import RcpTable from './RcpTable';
import RcpDialog from './RcpDialog';
import AddFab from '../../components/AddFab';

export default function Rcp() {
  const [ isDialogVisible, setIsDialogVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});

  function handleAddClick() {
    setEditData({});
    setIsDialogVisible(true);
  }

  function handleEditClick(_, data) {
    setEditData(data);
    setIsDialogVisible(true);
  }

  function handleCloseDialog() {
    setEditData({});
    setIsDialogVisible(false);
  }

  return (
    <>
      <AddFab onClick={handleAddClick} />
      <RcpTable onEditClick={handleEditClick} />
      <RcpDialog
        data={editData}
        open={isDialogVisible}
        onClose={handleCloseDialog}
      />
    </>
  );
}
