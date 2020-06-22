import { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

async function fetchRows(sheetId) {
  try {
    if (!sheetId) {
      return [];
    }

    const doc = new GoogleSpreadsheet(sheetId);

    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_GOOGLE_SA,
      private_key: process.env.REACT_APP_GOOGLE_PK,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
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
