import React, { useState, useReducer } from 'react';
import useLibrary from '../hooks/useLibrary';

import '../styles/ApiForm.css';

const ApiForm = props => {
  const [form, setForm] = useState(null);

  const { getData } = useLibrary();

  /*   const { setGetter } = useLibrary('music');
  const [checked, setChecked] = useState(false); */

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

  const handleSubmit = e => {
    e.preventDefault();
    /* console.log(e); */
    getData({
      formValues,
      setEntries: props.setEntries,
    });
  };

  return (
    <div className="api-console">
      <h3>Preferences</h3>
      <button id="update" onClick={e => handleFormSwitch(e)}>
        update
      </button>
      <button id="view" onClick={e => handleFormSwitch(e)}>
        view
      </button>

      {form === 'update' && (
        <form className="updateform" onSubmit={e => handleSubmit(e)}>
          <button type="submit" className="searchparambtn">
            Go!
          </button>
        </form>
      )}

      {form === 'view' && (
        <div className="view">
          <form className="viewform" onSubmit={e => handleSubmit(e)}>
            <input
              className="page"
              type="textinput"
              name="page"
              id="page"
              placeholder="page"
              onChange={e => handleChange(e)}
              value={formValues.page}
            ></input>
            <input
              className="limit"
              type="textinput"
              name="limit"
              id="limit"
              placeholder="limit"
              onChange={e => handleChange(e)}
              value={formValues.limit}
            ></input>
            {/* <input
              id="optionalsearch"
              type="textinput"
              name="optionalsearch"
              placeholder="optional term"
              onChange={e => handleChange(e)}
              values={formValues.optionalsearch}
              disabled
            ></input> */}
            <button type="submit" className="searchparambtn">
              Go!
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApiForm;
