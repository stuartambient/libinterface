import React, { useState } from 'react';

import ApiForm from './components/ApiForm';
import SimpleInfiniteList from './hooks/SimpleInfiniteList';
/* import Results from './components/Results'; */
import './App.css';

const App = () => {
  const [getData, setGetData] = useState(false);

  return (
    <>
      <div className="container">
        <div className="grid">
          <ApiForm setGetData={setGetData} getData={getData}></ApiForm>
          {getData === true && <SimpleInfiniteList start={1} />}
        </div>
      </div>
    </>
  );
};

export default App;
