import React, { useState, useEffect } from "react";
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";

const useDb = (pageNumber, textsearch) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  /*  React.useDebugValue({ loading, value: loading });
  React.useDebugValue({ error, value: error });
  React.useDebugValue({ items, value: items });
  React.useDebugValue({ hasMore, value: hasMore }); */

  console.log("PN: ", pageNumber);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `http://localhost:3001/api/v1/library/music/getTitles/`,
      params: { page: pageNumber, text: textsearch },
    })
      .then(res => {
        setItems(prevItems => {
          return [...prevItems, ...res.data];
        });
        setHasMore(res.data.length >= 100);
        setLoading(false);
      })
      .catch(e => {
        setError(true);
      });
  }, [pageNumber, textsearch]);

  return { loading, items, setItems, hasMore, error };
};

export default useDb;
