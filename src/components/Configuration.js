import React from 'react';
import '../styles/Configuration.css';

function Configuration({ updateResults }) {
  console.log('ur: ', updateResults);
  return (
    <div className='configure'>
      <ul className='update-results'>
        {/*  {updateResults.map(ur => {
          return (
            <li>
              📂 {ur.path} 📋 {ur.msg}
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}

export default Configuration;
