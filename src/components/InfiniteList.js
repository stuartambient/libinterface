import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import useDb from '../hooks/useDb';
import Loader from './loader';
import { Item, Link, EditButton, Input } from './ItemComponent';

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

  const handleEdit = (e, editItem) => {
    /* const editing = items.filter(item => editItem._id === item._id); */
    e.preventDefault();
    console.log(edits);

    if (edits.find(edit => edit._id === editItem._id)) {
      setEdits([
        ...edits.slice(0, edits.indexOf(editItem)),
        ...edits.slice(edits.indexOf(editItem) + 1, edits.length),
      ]);
    } else {
      setEdits(edits => [...edits, editItem]);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    console.log('id: ', e.target.id);
    edits.map(edit => {
      if (edit._id === e.target.id) {
        return setEdits(edits => [{ ...edit, path: e.target.value }]);
      } else {
        return edit;
      }
    });
  };

  const handleOpenDirectory = e => {
    e.preventDefault();
    setLink(e.target.href);
  };

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
              <Item
                className='item'
                key={item._id}
                forwardRef={lastItemElement}
                item={item}
              >
                <Link href={item.path} onClick={e => handleOpenDirectory(e)}>
                  {item.name}
                </Link>
                {edits.find(i => i._id === item._id) ? (
                  <>
                    <EditButton
                      id={item.key}
                      className='item-edit-btn item-submit-btn'
                      onClick={e => handleEdit(e, item)}
                    >
                      Submit
                    </EditButton>

                    <Input
                      id={item._id}
                      className='edit-input'
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <EditButton
                    id={item.key}
                    className='item-edit-btn'
                    onClick={e => handleEdit(e, item)}
                  >
                    Edit
                  </EditButton>
                )}
              </Item>
            );
          } else {
            return (
              <Item
                className={
                  edits.find(i => i._id === item._id) ? 'item editmode' : 'item'
                }
                item={item}
                key={item._id}
              >
                <Link href={item.path} onClick={e => handleOpenDirectory(e)}>
                  {item.name}
                </Link>
                {edits.find(i => i._id === item._id) ? (
                  <>
                    <EditButton
                      id={item.key}
                      className='item-edit-btn item-submit-btn'
                      onClick={e => handleEdit(e, item)}
                    >
                      Submit
                    </EditButton>
                    <Input
                      id={item._id}
                      className='edit-input'
                      value={edits.find(i => i._id === item._id).path}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <EditButton
                    id={item.key}
                    className='item-edit-btn'
                    onClick={e => handleEdit(e, item)}
                  >
                    Edit
                  </EditButton>
                )}
              </Item>
            );
          }
        })}
        {hasMore && (
          <>
            <div className='item itemloading'>
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
