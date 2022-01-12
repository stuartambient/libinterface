import React, { useState, useReducer } from 'react';
import useSelect from '../hooks/useSelect';

/* import useLibrary from '../hooks/useLibrary'; */

import '../styles/ApiForm.css';

const ApiForm = ({ searchReq, setSearchReq }) => {
  const [form, setForm] = useState(null);
  const [updateReq, setUpdateReq] = useState(false);
  const { drives } = useSelect();

  /* const { getData } = useLibrary(); */

  /*   const { setGetter } = useLibrary('music');
  const [checked, setChecked] = useState(false); */

  console.log('🦼🦽🦽', drives);

  const formReducer = (state, newState) => {
    return { ...state, ...newState };
  };

  const initialFormState = {
    page: '',
    /* optionalsearch: '', */
    limit: '',
  };

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  const handleFormSwitch = e => {
    if (e.target.id === 'update') {
      setUpdateReq(true);
    }
    setForm(e.target.id);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    console.log(e.target);
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
          {updateReq === true && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {drives.map(drive => {
                return (
                  <div className='checkbox' key={drive}>
                    <input
                      type='checkbox'
                      name={drive}
                      style={{ height: '1.5em' }}
                    />
                    <label>{drive}</label>
                    <input type='text' className='forminput-path' />
                  </div>
                );
              })}
            </div>
          )}
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
