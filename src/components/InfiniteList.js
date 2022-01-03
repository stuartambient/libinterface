import React, { useState, useRef, useCallback } from 'react';
import useDb from '../hooks/useDb';
/* import { Results, List, ListItem, Loading } from '../components/Results'; */
import '../styles/Results.css';

function InfiniteList() {
  const [pageNumber, setPageNumber] = useState(0);

  const { loading, items, hasMore, error } = useDb(pageNumber);

  const observer = useRef();
  const lastItemElement = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="results">
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <div className="item" ref={lastItemElement} key={item._id}>
                {item.name}
              </div>
            );
          } else {
            return (
              <div className="item" key={item._id}>
                {item.name}
              </div>
            );
          }
        })}
        <div className="item">{loading && 'Loading...'}</div>
        <div className="item">{error && 'Error'}</div>
      </div>
    </>
  );
}

export default InfiniteList;
