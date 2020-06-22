import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const key = 'gsheet-id';

export default function useSheetId() {
  const history = useHistory();
  const { pathname } = useLocation();

  const [ sheetId, _setSheetId ] = useState('');

  function setSheetId(id) {
    localStorage.setItem(key, id);
    _setSheetId(id);
  }

  useEffect(() => {
    const id = localStorage.getItem(key);
    _setSheetId(id);

    if (!id && pathname !== '/setup') {
      history.push('/setup');
    }

    if (id && pathname === '/setup') {
      history.push('/');
    }
  }, [history, pathname, sheetId]);

  return [sheetId, setSheetId]
}
