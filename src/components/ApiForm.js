import React, { useState, useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';
import usePaths from '../hooks/usePaths';

/* import useLibrary from '../hooks/useLibrary'; */

import '../styles/ApiForm.css';
import '../styles/root.css';

const ApiForm = ({ searchReq, setSearchReq }) => {
  const [form, setForm] = useState(null);
  const [preferences, openPreferences] = useState(false);
  const { setPaths, invalid, confirmed, setReqCurrent, current } = usePaths();

  useEffect(() => {
    if (form === 'update') {
      setReqCurrent(true);
    }
  }, [form, setReqCurrent]);

  const formReducer = (state, newState) => {
    return { ...state, ...newState };
  };

  const initialFormState = {
    page: '',
    /* optionalsearch: '', */
    limit: '',
    paths: [],
  };

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  const handleFormSwitch = e => {
    setForm(e.target.id);
    if (e.target.id === 'update') {
      setSearchReq(searchReq => ({
        ...searchReq,
        req: false,
        config: true,
        textsearch: '',
      }));
    }

    if (e.target.id === 'view') {
      setSearchReq(searchReq => ({
        ...searchReq,
        req: false,
        config: false,
        textsearch: '',
      }));
    }
    /*  setSearchReq(searchReq => ({
      ...searchReq,
      req: false,
    })); */
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    if (formValues.paths === '') return;
    const pathsArray = formValues.paths.split(',');
    const trimmed = pathsArray.map(path => path.trimStart());
    setPaths(trimmed);
  };

  const handleMenu = e => {
    e.preventDefault();
    openPreferences(!preferences);
    setForm(null);
  };

  const sendSubmit = e => {
    setSearchReq(searchReq => ({
      ...searchReq,
      req: true,
      textsearch: formValues.optionalsearch,
    }));
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    /*     setSearchReq(prevsearchReq => ({
      ...prevsearchReq,
      req: true,
      textsearch: formValues.optionalsearch,
    })); */
    setSearchReq(searchReq => ({
      ...searchReq,
      req: false,
      /* textsearch: formValues.optionalsearch, */
    }));

    setTimeout(() => sendSubmit(e), 1000);

    /* props.setSearchReq({ req: !props.searchReq.req });
    if (formValues.optionalsearch)
      props.setSearchReq({ textsearch: formValues.optionalsearch }); */

    /* console.log(e); */
    /* getData({
      formValues,
      setEntries: props.setEntries,
    }); */
    /* props.setGetData(
      props.getData === false ? props.setGetData(true) : props.setGetData(false)
    ); */
  };

  return (
    <div className='api-console'>
      {/*       <h3 onClick={e => openPreferences(!preferences)}>Preferences</h3> */}
      <h3 onClick={e => handleMenu(e)}>Preferences</h3>
      {preferences && (
        <div
          className='update'
          id='update'
          data-descrp='add, remove or update'
          onClick={e => handleFormSwitch(e)}
        >
          update
        </div>
      )}

      {preferences && (
        <div
          className='view'
          id='view'
          data-descrp='search or view all'
          onClick={e => handleFormSwitch(e)}
        >
          view
        </div>
      )}

      {form === 'update' && (
        <form className='updateform' onSubmit={e => handleUpdateSubmit(e)}>
          {/* {current && <div>{current}</div>} */}
          <input
            id='paths'
            type='textinput'
            name='paths'
            placeholder='comma separated'
            onChange={e => handleChange(e)}
            values={formValues.paths}
          ></input>
          <button type='submit' className='searchparambtn'>
            Update
          </button>
        </form>
      )}

      {form === 'view' && (
        <form className='viewform' onSubmit={e => handleSearchSubmit(e)}>
          {/* <input
              className='page'
              type='textinput'
              name='page'
              id='page'
              placeholder='page'
              onChange={e => handleChange(e)}
              value={formValues.page}
            ></input>
            <input
              className='limit'
              type='textinput'
              name='limit'
              id='limit'
              placeholder='limit'
              onChange={e => handleChange(e)}
              value={formValues.limit}
            ></input> */}
          <input
            id='optionalsearch'
            type='textinput'
            name='optionalsearch'
            placeholder='optional term'
            onChange={e => handleChange(e)}
            values={formValues.optionalsearch}
          ></input>
          <button type='submit' className='searchparambtn'>
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default ApiForm;
