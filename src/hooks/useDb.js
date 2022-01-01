import React from 'react';
import Axios from 'axios';

const useDb = () => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [error, setError] = React.useState();

  const loadMore = async (page, limit) => {
    setLoading(true);
    try {
      const { data, hasNextPage: newHasNextPage } = await Axios.get(
        `http://localhost:3001/api/v1/library/music/getTitles?&page=${page}`
      );
      setItems(current => [...current, ...data]);
      setHasNextPage(newHasNextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, items, hasNextPage, error, loadMore };
};

export default useDb;
