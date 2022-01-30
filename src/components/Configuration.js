import React from 'react';
import '../styles/Configuration.css';

function Configuration() {
  return (
    <div className='configure'>
      <form className='configure-form'>
        <label htmlFor='current-locations'>
          <input type='checkbox' id='current-locations' />
        </label>
      </form>
    </div>
  );
}

export default Configuration;
