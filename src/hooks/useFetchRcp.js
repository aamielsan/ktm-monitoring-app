import { useEffect, useState } from 'react';
import { fetchRows } from '../api';

function useFetchRcp(sheetId, refresh) {
  const [ loading, setLoading ] = useState(false);
  const [ rows, setRows ] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRows(sheetId)
      .then(rows => setRows(rows))
      .finally(_ => setLoading(false));
  }, [sheetId]);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      fetchRows(sheetId)
        .then(rows => setRows(rows))
        .finally(_ => setLoading(false));
    }
  }, [refresh]); // eslint-disable-line

  return {
    rows,
    loading,
  };
}

export default useFetchRcp;
