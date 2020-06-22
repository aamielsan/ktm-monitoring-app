import { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

async function fetchRows(sheetId) {
  try {
    if (!sheetId) {
      return [];
    }

    const doc = new GoogleSpreadsheet(sheetId);

    console.log('sa auth');
    await doc.useServiceAccountAuth(require('../.keys/gsheetKey.json'));
    console.log('done sa auth');
    await doc.loadInfo();
    console.log('done load info');
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    console.log('done get rows');
    return rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function useFetchData(sheetId) {
  const [ loading, setLoading ] = useState(false);
  const [ rows, setRows ] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRows(sheetId)
      .then(rows => setRows(rows))
      .finally(_ => setLoading(false));
  }, [sheetId]);

  return {
    rows,
    loading,
  };
}

export default useFetchData;
