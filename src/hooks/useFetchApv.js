import { useEffect, useState } from 'react';
import { fetchRows } from '../api';

function isPending(row) {
  return !row.apv_no;
}

function useFetchApv(sheetId) {
  const [ loading, setLoading ] = useState(false);
  const [ rows, setRows ] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRows(sheetId)
      .then(rows => {
        const pending = rows.filter(isPending);
        setRows(pending);
      })
      .finally(_ => setLoading(false));
  }, [sheetId]);

  return {
    rows,
    loading,
  };
}

export default useFetchApv;
