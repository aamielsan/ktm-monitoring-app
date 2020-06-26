import React, { useState } from 'react';
import PendingSignatureTable from './PendingSignatureTable';
import CdvEditDialog from '../Cdv/CdvEditDialog';
import RefreshFab from '../../components/RefreshFab';
import useRefresh from '../../hooks/useRefresh';

export default function PendingSignature() {
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
      <PendingSignatureTable
        refresh={refresh}
        onEditClick={handleEditClick}
      />
      <CdvEditDialog
        data={editData}
        open={isEditVisible}
        onClose={handleEditClose}
      />
    </>
  );
}
