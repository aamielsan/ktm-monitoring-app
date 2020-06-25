import React, { useState } from 'react';
import RcpTable from './RcpTable';
import RcpDialog from './RcpDialog';
import AddFab from '../../components/AddFab';
import RefreshFab from '../../components/RefreshFab';
import useRefresh from '../../hooks/useRefresh';

export default function Rcp() {
  const [ refresh, setRefresh ] = useRefresh()
  const [ isDialogVisible, setIsDialogVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});

  function handleRefreshClick() {
    setRefresh(true, () => setRefresh(false));
  }

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
      <RefreshFab disabled={refresh} onClick={handleRefreshClick} />
      <AddFab onClick={handleAddClick} />
      <RcpTable refresh={refresh} onEditClick={handleEditClick} />
      <RcpDialog
        data={editData}
        open={isDialogVisible}
        onClose={handleCloseDialog}
      />
    </>
  );
}
