import React, { useState } from 'react';

import ApiForm from './components/ApiForm';
import InfiniteList from './components/InfiniteList';

/* import Results from './components/Results'; */
import './App.css';
/* import { useEffect } from 'react/cjs/react.development'; */

const App = () => {
  /* const [getData, setGetData] = useState(false);
  const [textSearch, setTextSearch] = useState(); */

  const [searchReq, setSearchReq] = useState({ req: false, textsearch: '' });

  return (
    <>
      <div className='container'>
        <div className='grid'>
          <ApiForm setSearchReq={setSearchReq} searchReq={searchReq}></ApiForm>
          {searchReq.req === true && (
            <InfiniteList textSearch={searchReq.textsearch} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
