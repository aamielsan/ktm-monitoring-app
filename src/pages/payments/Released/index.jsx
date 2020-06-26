import React, { useState } from 'react';
import ReleasedTable from './ReleasedTable';
import RefreshFab from '../../../components/RefreshFab';
import useRefresh from '../../../hooks/useRefresh';
import PaymentEditDialog from '../PaymentEditDialog';

export default function Released() {
  const [ refresh, setRefresh ] = useRefresh();
  const [ isEditVisible, setIsEditVisible ] = useState(false);
  const [ editData, setEditData ] = useState({});

  function handleRefreshClick() {
    setRefresh(true, () => setRefresh(false));
  }

  function handleEditClick(_, data) {
    setEditData(data);
    setIsEditVisible(true);
  }

  function handleEditClose() {
    setEditData({});
    setIsEditVisible(false);
  }

  return (
    <>
      <RefreshFab disabled={refresh} onClick={handleRefreshClick} />
      <ReleasedTable
        refresh={refresh}
        onEditClick={handleEditClick}
      />
      <PaymentEditDialog
        data={editData}
        open={isEditVisible}
        onClose={handleEditClose}
      />
    </>
  );
}
