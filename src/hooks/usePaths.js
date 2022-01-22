import { useState, useEffect } from 'react';
import axios from 'axios';

const usePaths = () => {
  // the form uses setPaths to set the paths entered
  const [paths, setPaths] = useState([]);
  // PATHS THAT ARE NOT VALID RETURNED FROM SERVER
  const [invalid, setInvalid] = useState([]);
  // PATHS THAT EXIST RETURNED FROM SERVER
  const [confirmed, setConfirmed] = useState([]);
  // I TRIED TO SET BOTH INVALID AND CONFIRMED IN THE FETCH
  // DATA FUNCTION BELOW  HOWEVER 'RES' SEEMS TO VANISH
  // AFTER SETTING THE FIRST STATE
  // MAYBE COMBINE BOTH IN A USEREDUCER
  const [current, setCurrent] = useState(true);
  const [response, setResponse] = useState();

  const setPathsUrl = `http://localhost:3001/api/v1/library/music/userPaths/`;
  const getPathsUrl = `http://localhost:3001/api/v1/library/music/currentUserPaths/`;

  useEffect(() => {
    const fetchData = paths => {
      axios({
        method: 'GET',
        url: `http://localhost:3001/api/v1/library/music/userPaths/`,
        params: { paths: paths },
      }).then(res => setResponse(res));
    };

    if (paths.length) {
      fetchData(paths);
    }
  }, [paths]);

  useEffect(() => {
    if (response) {
      setConfirmed(response.data.confirmed);
      setInvalid(response.data.invalid);
    }
  }, [response, setConfirmed, setInvalid]);

  /* function handlePathsResponse(data) {
    console.log('data: ', data);
    setInvalid(data.invalid);
    setConfirmed(data.confirmed);
    setPaths([]);
  } */

  return { setPaths, invalid, confirmed, response };
};

export default usePaths;
