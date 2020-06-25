import { useEffect, useState } from 'react';
import { fetchRows } from '../api';

function useFetchRcp(sheetId) {
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

export default useFetchRcp;
