import { useState, useEffect } from 'react';

export default function useRefresh() {
  const [ refresh, setRefresh ] = useState(false);
  
  useEffect(() => {
    refresh && setRefresh(false);
  }, [refresh]);

  return [refresh, setRefresh];
}
