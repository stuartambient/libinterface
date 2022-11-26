import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import useDb from "../hooks/useDb";
import Loader from "./loader";
import { Item, Link, EditButton, Input } from "./ItemComponent";

/* import useNode from '../hooks/useNode'; */
/* import { Results, List, ListItem, Loading } from '../components/Results'; */
import "../styles/Results.css";

function InfiniteList({ textSearch }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [link, setLink] = useState("");
  const [edits, setEdits] = useState([]);

  useEffect(() => {
    console.log("PN: ", pageNumber);
  }, [pageNumber]);

  const { loading, items, setItems, hasMore, error } = useDb(
    pageNumber,
    textSearch
  );

  const handleEdit = (e, editItem) => {
    /* const editing = items.filter(item => editItem._id === item._id); */
    e.preventDefault();
    const el = edits.find(edit => edit._id === editItem._id);

    if (el) {
      console.log("el: ", el.path, el.og);
      const config = { from: el.og, to: el.path };

      axios({
        method: "POST",
        url: `http://localhost:3001/api/v1/library/music/changePath/`,
        data: config,
      })
        .then(res => console.log("res: ", res))
        .then(
          setEdits([
            ...edits.slice(0, edits.indexOf(editItem)),
            ...edits.slice(edits.indexOf(editItem) + 1, edits.length),
          ])
        );

      /* setEdits([
        ...edits.slice(0, edits.indexOf(editItem)),
        ...edits.slice(edits.indexOf(editItem) + 1, edits.length),
      ]); */
    } else {
      editItem.og = editItem.path;
      setEdits(edits => [...edits, editItem]);
    }
  };

  const handleChange = e => {
    e.preventDefault();

    edits.map(edit => {
      if (edit._id === e.target.id) {
        edit.path = e.target.value;

        return setEdits(edits => [...edits]);
      } else {
        return edit;
      }
    });
  };

  const handleOpenDirectory = e => {
    e.preventDefault();
    setLink(e.target.href);
  };

  /*   useEffect(() => {
    setItems([]);
  }, [textSearch, setItems]); */

  useEffect(() => {
    if (link)
      axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/library/music/openWinFolder/`,
        params: { link: link },
      }).then(res => console.log(res));

    return () => {
      setLink("");
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
        { root: document.querySelector(".results") }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="results">
        {loading && (
          <div className="loader-flex">
            <Loader />
          </div>
        )}
        {!items.length && !loading ? (
          <div className="no-results">No results</div>
        ) : null}
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <Item
                className="item"
                key={item._id}
                forwardRef={lastItemElement}
                item={item}
              >
                <Link
                  href={item.fullpath}
                  onClick={e => handleOpenDirectory(e)}
                >
                  {item.foldername}
                </Link>
                {edits.find(i => i._id === item._id) ? (
                  <>
                    <EditButton
                      id={item.key}
                      className="item-edit-btn item-submit-btn"
                      onClick={e => handleEdit(e, item)}
                    >
                      Submit
                    </EditButton>

                    <Input
                      id={item._id}
                      className="edit-input"
                      value={edits.find(i => i._id === item._id).fullpath}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <EditButton
                    id={item.key}
                    className="item-edit-btn"
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
                  edits.find(i => i._id === item._id) ? "item editmode" : "item"
                }
                item={item}
                key={item._id}
              >
                <Link
                  href={item.fullpath}
                  onClick={e => handleOpenDirectory(e)}
                >
                  {item.foldername}
                </Link>
                {edits.find(i => i._id === item._id) ? (
                  <>
                    <EditButton
                      id={item.key}
                      className="item-edit-btn item-submit-btn"
                      onClick={e => handleEdit(e, item)}
                    >
                      Submit
                    </EditButton>
                    <Input
                      id={item._id}
                      className="edit-input"
                      value={edits.find(i => i._id === item._id).fullpath}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <EditButton
                    id={item.key}
                    className="item-edit-btn"
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
            <div className="item itemloading">
              {loading && items.length ? (
                <div className="loading">Loading...</div>
              ) : null}
            </div>
            <div className="item itemerror">{error && "Error"}</div>
          </>
        )}
      </div>
    </>
  );
}

export default InfiniteList;
