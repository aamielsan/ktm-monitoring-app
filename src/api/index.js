import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';

export async function fetchRows(sheetId) {
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

export async function saveRcp(rcp) {
  try {
    if (!rcp) {
      return;
    }

    const res = await axios.post(process.env.REACT_APP_BACKEND_URL, rcp, {
      headers: {
        'x-api-key': process.env.REACT_APP_BACKEND_KEY,
      },
    });

    return res.data;

  } catch (e) {
    throw e;
  }
}


