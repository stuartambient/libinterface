import { useState, useEffect } from 'react';
import axios from 'axios';

const useDb = (pageNumber, textsearch) => {
  console.log('called useDb');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [found, setFound] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: `http://localhost:3001/api/v1/library/music/getTitles/`,
      params: { page: pageNumber, text: textsearch },
    })
      .then(res => {
        if (!res.data.length) setFound(false);
        setItems(prevItems => {
          return [...prevItems, ...res.data];
        });
        setHasMore(res.data.length >= 100);
        /* console.log('has more: ', res.data.length > 100); */
        setLoading(false);
      })
      .catch(e => {
        setError(true);
      });
  }, [pageNumber, textsearch]);

  return { loading, items, setItems, hasMore, error, found };
};

export default useDb;
