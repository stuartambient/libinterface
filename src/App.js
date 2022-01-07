import React, { useState } from 'react';

import ApiForm from './components/ApiForm';
import InfiniteList from './components/InfiniteList';
/* import Results from './components/Results'; */
import './App.css';

const App = () => {
  const [getData, setGetData] = useState(false);
  const [textSearch, setTextSearch] = useState();

  return (
    <>
      <div className='container'>
        <div className='grid'>
          <ApiForm
            setGetData={setGetData}
            getData={getData}
            textSearch={textSearch}
            setTextSearch={setTextSearch}
          ></ApiForm>
          {getData === true && <InfiniteList textSearch={textSearch} />}
        </div>
      </div>
    </>
  );
};

export default App;
