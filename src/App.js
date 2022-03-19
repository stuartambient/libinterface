import React, { useState, useEffect } from 'react';

import ApiForm from './components/ApiForm';
import InfiniteList from './components/InfiniteList';
import Configuration from './components/Configuration';

/* import Results from './components/Results'; */
import './App.css';
/* import { useEffect } from 'react/cjs/react.development'; */

const App = () => {
  const [main, setMain] = useState({
    isSearch: false,
    isConfig: false,
    textsearch: '',
    updateResults: {},
  });

  /*  const [scanPath, setScanPath] = useState(null); */

  /*   const { pathArray } = usePaths(scanPath); */

  return (
    <>
      <div className='container'>
        <div className='grid'>
          <ApiForm
            appState={main}
            setAppState={setMain}
            /*             setScanPath={setScanPath}
            scanPath={scanPath} */
          ></ApiForm>
          {main.isSearch === true && (
            <InfiniteList textSearch={main.textsearch} />
          )}
          {main.isConfig === true && (
            <Configuration updateResults={main.updateResults} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
