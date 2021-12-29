import React, { useState } from 'react';

import ApiForm from './components/ApiForm';
import Results from './components/Results';
import './App.css';

const App = () => {
  const [entries, setEntries] = useState([]);

  return (
    <>
      <div className="container">
        <div className="grid">
          <ApiForm setEntries={setEntries}></ApiForm>
          {entries.length > 0 && <Results entries={entries}></Results>}
        </div>
      </div>
    </>
  );
};

export default App;
