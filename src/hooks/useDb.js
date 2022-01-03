import { useState, useEffect } from 'react';
import axios from 'axios';

const useDb = pageNumber => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  /*   useEffect(() => {
    setItems([]);
  }, [query]); */

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/library/music/getTitles',
      params: { page: pageNumber },
    })
      .then(res => {
        setItems(prevItems => {
          return [...prevItems, ...res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch(e => {
        setError(true);
      });
  }, [pageNumber]);

  return { loading, items, hasMore, error };
};

export default useDb;
