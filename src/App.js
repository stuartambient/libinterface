import React, { useState, useEffect } from 'react';

import ApiForm from './components/ApiForm';
import InfiniteList from './components/InfiniteList';

/* import Results from './components/Results'; */
import './App.css';
/* import { useEffect } from 'react/cjs/react.development'; */

const App = () => {
  /* const [getData, setGetData] = useState(false);
  const [textSearch, setTextSearch] = useState(); */

  const [searchReq, setSearchReq] = useState({ req: false, textsearch: '' });
  const [scanPath, setScanPath] = useState(null);

  /*   const { pathArray } = usePaths(scanPath); */
  useEffect(() => {
    console.log('SEARCH REQ: ', searchReq);
  }, [searchReq]);

  return (
    <>
      <div className='container'>
        <div className='grid'>
          <ApiForm
            setSearchReq={setSearchReq}
            searchReq={searchReq}
            setScanPath={setScanPath}
            scanPath={scanPath}
          ></ApiForm>
          {searchReq.req === true && (
            <InfiniteList textSearch={searchReq.textsearch} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
