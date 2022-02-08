import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import useDb from '../hooks/useDb';
import Loader from './loader';

/* import useNode from '../hooks/useNode'; */
/* import { Results, List, ListItem, Loading } from '../components/Results'; */
import '../styles/Results.css';

function InfiniteList({ textSearch }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [link, setLink] = useState('');
  const [edits, setEdits] = useState([{ item: {} }]);

  const { loading, items, setItems, hasMore, error } = useDb(
    pageNumber,
    textSearch
  );

  const handleEdit = id => {
    items.map(item => {
      if (item._id === id) {
        item = { ...item, edit: true };
        return console.log(item);
      } else {
        console.log('didnt work');
        return item;
      }
    });
  };

  const editRef = useRef(null);

  useEffect(() => {
    setItems([]);
  }, [textSearch, setItems]);

  useEffect(() => {
    if (link)
      axios({
        method: 'GET',
        url: `http://localhost:3001/api/v1/library/music/openWinFolder/`,
        params: { link: link },
      }).then(res => console.log(res));

    return () => {
      setLink('');
    };
  }, [link]);

  const observer = useRef();
  const lastItemElement = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
          }
        },
        { root: document.querySelector('.results') }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className='results'>
        {loading && (
          <div className='loader-flex'>
            <Loader />
          </div>
        )}
        {!items.length && !loading ? (
          <div className='no-results'>No results</div>
        ) : null}
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <div className='item' key={item._id} ref={lastItemElement}>
                <a
                  href={item.path}
                  onClick={e => {
                    e.preventDefault();
                    setLink(e.target.href);
                  }}
                >
                  {item.name}
                </a>
                <div
                  className='item-edit-btn'
                  ref={editRef}
                  onClick={
                    (e => e.preventDefault(),
                    () => handleEdit(item._id, item.path))
                  }
                  /* onClick={e => handleEditClick(e)} */
                >
                  Edit
                </div>
              </div>
            );
          } else {
            return (
              <div className='item' key={item._id}>
                <a
                  href={item.path}
                  onClick={e => {
                    e.preventDefault();
                    setLink(e.target.href);
                  }}
                >
                  {item.name}
                </a>
                {/* {edit === true ? (
                  <div
                    className='item-submit-edit-btn'
                    ref={editRef}
                    onClick={handleEditClick}
                  >
                    Submit
                  </div>
                ) : ( */}
                <div
                  className='item-edit-btn'
                  ref={editRef}
                  onClick={
                    (e => e.preventDefault(),
                    () => handleEdit(item._id, item.path))
                  }
                >
                  Edit
                </div>
                {/* )} */}
              </div>
            );
          }
        })}
        {hasMore && (
          <>
            <div
              className='item' /* style={{ backgroundColor: 'lightgray' }} */
            >
              {loading && items.length ? (
                <div className='loading'>Loading...</div>
              ) : null}
            </div>
            <div className='item'>{error && 'Error'}</div>
          </>
        )}
      </div>
    </>
  );
}

export default InfiniteList;
