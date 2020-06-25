import React from 'react';
import useSheetId from '../hooks/useSheetId';
import RCPPrompt from './RCPPrompt';

export default function Setup() {
  const [ sheetId, setSheetId ] = useSheetId();

  function handleSubmit(_, sheet) {
    setSheetId(sheet);
  }

  return (
    <RCPPrompt initialValue={sheetId} onSubmit={handleSubmit} />
  );
}
