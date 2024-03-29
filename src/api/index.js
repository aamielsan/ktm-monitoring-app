import { GoogleSpreadsheet } from 'google-spreadsheet';
import pick from 'lodash.pick';
import axios from 'axios';
import { TYPE_MAP } from '../constants';
import { normalize } from '../utils';

let doc;
let currSheetId

export async function fetchRows(sheetId) {
  try {
    if (!sheetId) {
      return [];
    }

    if (currSheetId !== sheetId) {
      doc = new GoogleSpreadsheet(sheetId);
      await doc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_SA,
        private_key: process.env.REACT_APP_GOOGLE_PK,
      });
      currSheetId = sheetId;
    }

    if (!doc._rawProperties) {
      await doc.loadInfo();
    }

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return (rows || []).map(r => pick(r, Object.keys(TYPE_MAP)));
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function saveRcp({ id, data }) {
  try {
    if (!data || !id) {
      return;
    }

    const res = await axios.post(
      process.env.REACT_APP_BACKEND_URL,
      {
        id,
        data: normalize(data),
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_BACKEND_KEY,
      },
    });

    return res.data;

  } catch (e) {
    throw e;
  }
}


