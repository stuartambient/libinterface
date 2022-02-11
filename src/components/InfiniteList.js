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
  const [edits, setEdits] = useState([]);

  const { loading, items, setItems, hasMore, error } = useDb(
    pageNumber,
    textSearch
  );

  const handleEdit = editItem => {
    if (edits.includes(editItem)) {
      console.log(edits.indexOf(editItem));
      setEdits([
        ...edits.slice(0, edits.indexOf(editItem)),
        ...edits.slice(edits.indexOf(editItem) + 1, edits.length),
      ]);
    } else {
      setEdits(edits => [...edits, editItem]);
    }

    // everything from 0 through index

    /* edits.map((edit, index) => {
      console.log(edit.key === editItem.key);
      return console.log(edit);
    }); */
    /* setEdits(edits => [...edits, item]); */
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
                {edits.find(i => i.key === item.key) ? (
                  <div
                    className='item-edit-btn'
                    onClick={(e => e.preventDefault(), () => handleEdit(item))}
                  >
                    Submit
                  </div>
                ) : (
                  <div
                    className='item-edit-btn'
                    onClick={(e => e.preventDefault(), () => handleEdit(item))}
                  >
                    Edit
                  </div>
                )}
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
                {edits.find(i => i.key === item.key) ? (
                  <div
                    id={item.key}
                    className='item-edit-btn item-submit-btn'
                    onClick={(e => e.preventDefault(), () => handleEdit(item))}
                  >
                    Submit
                  </div>
                ) : (
                  <div
                    id={item.key}
                    className='item-edit-btn'
                    onClick={(e => e.preventDefault(), () => handleEdit(item))}
                  >
                    Edit
                  </div>
                )}
              </div>
            );
          }
        })}
        {hasMore && (
          <>
            <div
              className='item itemloading' /* style={{ backgroundColor: 'lightgray' }} */
            >
              {loading && items.length ? (
                <div className='loading'>Loading...</div>
              ) : null}
            </div>
            <div className='item itemerror'>{error && 'Error'}</div>
          </>
        )}
      </div>
    </>
  );
}

export default InfiniteList;
