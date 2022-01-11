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
    setForm(e.target.id);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    setUpdateReq(true);
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
      <button id='update' onClick={e => handleFormSwitch(e)}>
        update
      </button>
      {/* {updateReq === true && (
        <div className='update-select'>
          {drives.map(drive => {
            return (
              <div
                key={drive}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input type='checkbox' name={drive} />
                <label>{drive}</label>
                <input type='text' />
              </div>
            );
          })}
        </div>
      )} */}
      <button id='view' onClick={e => handleFormSwitch(e)}>
        view
      </button>

      {form === 'update' && (
        <form className='updateform' onSubmit={e => handleUpdateSubmit(e)}>
          <button type='submit' className='searchparambtn'>
            Update
          </button>
        </form>
      )}

      {form === 'view' && (
        <div className='view'>
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
        </div>
      )}
    </div>
  );
};

export default ApiForm;
