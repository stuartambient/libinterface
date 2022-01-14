import React, { useEffect, useState, useReducer } from 'react';
import AddPaths from './AddPaths';

/* import useLibrary from '../hooks/useLibrary'; */

import '../styles/ApiForm.css';

const ApiForm = ({ searchReq, setSearchReq }) => {
  const [form, setForm] = useState(null);

  const formReducer = (state, newState) => {
    return { ...state, ...newState };
  };

  const [paths, setPaths] = useState([]);
  const [currentPaths, setCurrentPaths] = useState([]);

  useEffect(
    function readPaths() {
      if (paths.length) {
        const response = AddPaths(paths);
        setPaths([]);
        setCurrentPaths(response);
      }
      return;
    },
    [paths]
  );

  const initialFormState = {
    page: '',
    /* optionalsearch: '', */
    limit: '',
    paths: [],
  };

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  const handleFormSwitch = e => {
    setForm(e.target.id);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    if (!formValues.paths.length) return;
    const pathsArray = formValues.paths.split(',');
    setFormValues(() => ({
      ...formValues,
      paths: pathsArray,
    }));
    setPaths(pathsArray);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchReq(prevsearchReq => ({
      ...prevsearchReq,
      req: true,
      textsearch: formValues.optionalsearch,
    }));
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
      <h3>Preferences</h3>
      <div className='update' id='update' onClick={e => handleFormSwitch(e)}>
        update
      </div>

      <div className='view' id='view' onClick={e => handleFormSwitch(e)}>
        view
      </div>

      {form === 'update' && (
        <form className='updateform' onSubmit={e => handleUpdateSubmit(e)}>
          {currentPaths.length > 0 &&
            currentPaths.map(cp => <p key={cp}>{cp}</p>)}
          <input
            id='paths'
            type='textinput'
            name='paths'
            placeholder='comma separated...'
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
