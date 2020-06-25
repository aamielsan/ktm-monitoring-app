import React, { useState } from 'react';
import ApvTable from './ApvTable';
import ApvDialog from './ApvDialog';
import RefreshFab from '../../components/RefreshFab';
import useRefresh from '../../hooks/useRefresh';

export default function Apv() {
  const [ refresh, setRefresh ] = useRefresh();
  const [ isDialogVisible, setIsDialogVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});

  function handleRefreshClick() {
    setRefresh(true, () => setRefresh(false));
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
      <RefreshFab disabled={refresh} onClick={handleRefreshClick} />
      <ApvTable refresh={refresh} onEditClick={handleEditClick} />
      <ApvDialog
        data={editData}
        open={isDialogVisible}
        onClose={handleCloseDialog}
      />
    </>
  );
}
