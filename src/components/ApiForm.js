import React, { useState, useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';
import usePaths from '../hooks/usePaths';

import { FaBookOpen } from 'react-icons/fa';

/* import useLibrary from '../hooks/useLibrary'; */

import '../styles/ApiForm.css';
import '../styles/root.css';

const ApiForm = ({ appState, setAppState }) => {
  // configuration or search form / which form
  const [form, setForm] = useState(null);
  // opens and closes the full menu
  const [preferences, openPreferences] = useState(false);
  // configure and collect paths
  const { response, setPaths, setRequestCurrentPaths } = usePaths();

  // setup form from usePaths()
  useEffect(() => {
    if (form === 'update') {
      setRequestCurrentPaths(true);
    }
  }, [form, setRequestCurrentPaths]);

  useEffect(() => {
    if (response) {
      /* console.log('response: ', response); */
      setAppState(appState => ({
        ...appState,
        /* isSearch: false,
        isConfig: true,
        textsearch: '', */
        updateResults: response,
      }));
    }
  }, [response, setAppState]);

  // element values
  const formReducer = (state, newState) => {
    return { ...state, ...newState };
  };

  // initial object and its 3 properties
  const initialFormState = {
    page: '',
    /* optionalsearch: '', */
    limit: '',
    paths: [],
  };

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  // resets object from App.js where main content is either a form for config
  // or for search results

  const handleFormSwitch = e => {
    setForm(e.target.id);
    console.log('etargetid: ', e.target.id);
    if (e.target.id === 'update') {
      setAppState(appState => ({
        ...appState,
        isSearch: false,
        isConfig: true,
        textsearch: '',
      }));
    }

    if (e.target.id === 'view') {
      setAppState(appState => ({
        ...appState,
        isSearch: false,
        isConfig: false,
        textsearch: '',
      }));
    }
    /*  setSearchReq(searchReq => ({
      ...searchReq,
      req: false,
    })); */
  };

  // keep state for form inputs

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  // handles update form values

  const handleUpdateSubmit = e => {
    e.preventDefault();
    console.log(formValues.paths);
    /*     if (!e.target.value) return console.log('no value: ', e.target.value); */
    if (formValues.paths === '') return;
    const pathsArray = formValues.paths.split(',');
    const trimmed = pathsArray.map(path => path.trimStart());
    setPaths(trimmed);
  };

  //search form values

  const sendSubmit = e => {
    setAppState(appState => ({
      ...appState,
      isSearch: true,
      textsearch: formValues.optionalsearch,
    }));
  };

  // opens menu, starts with no active forms,
  // resets App's state object
  const handleMenu = e => {
    e.preventDefault();
    openPreferences(!preferences);

    setForm(null);

    setAppState(appState => ({
      ...appState,
      isSearch: false,
      isConfig: false,
      textsearch: '',
    }));
  };

  // changes App state first - setting new form text,
  // having App remove  'Results' first (mostly for the 'new search' loader),
  // uses a setTimeout between removing and opening again the results page
  const handleSearchSubmit = e => {
    e.preventDefault();

    setAppState(prevappState => ({
      ...prevappState,
      isSearch: false,
      textsearch: formValues.optionalsearch,
    }));

    setTimeout(() => sendSubmit(e), 1000);
  };

  return (
    <div className='api-console'>
      {/*       <h3 onClick={e => openPreferences(!preferences)}>Preferences</h3> */}
      <div className='menu-tab'>
        <div className='icon' onClick={e => handleMenu(e)}>
          <FaBookOpen id='icon' />
        </div>

        {preferences && (
          <div
            /* className='update' */
            className={form === 'update' ? 'updateactive' : 'update'}
            id='update'
            data-descrp='add, remove or update'
            onClick={e => handleFormSwitch(e)}
          >
            update
          </div>
        )}

        {preferences && (
          <div
            /* className='view' */
            className={form === 'view' ? 'viewactive' : 'view'}
            id='view'
            data-descrp='search or view all'
            onClick={e => handleFormSwitch(e)}
          >
            view
          </div>
        )}
      </div>

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
