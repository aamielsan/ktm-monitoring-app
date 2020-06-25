import React, { useState } from 'react';
import ApvTable from './ApvTable';
import ApvDialog from './ApvDialog';

export default function Apv() {
  const [ isDialogVisible, setIsDialogVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});

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
      <ApvTable onEditClick={handleEditClick} />
      <ApvDialog
        data={editData}
        open={isDialogVisible}
        onClose={handleCloseDialog}
      />
    </>
  );
}
