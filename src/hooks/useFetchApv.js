import { useEffect, useState } from 'react';
import { fetchRows } from '../api';

function isPending(row) {
  return Boolean(
    row.rcp_item
    && !row.apv_no
  );
}

function useFetchApv(sheetId, refresh) {
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

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      fetchRows(sheetId)
        .then(rows => {
          const pending = rows.filter(isPending);
          setRows(pending);
        })
        .finally(_ => setLoading(false));
    }
  }, [refresh]); // eslint-disable-line

  return {
    rows,
    loading,
  };
}

export default useFetchApv;
