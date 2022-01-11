import { useState, useEffect } from 'react';
import axios from 'axios';

const useSelect = () => {
  const [drives, setDrives] = useState();

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/library/music/getLocations',
    })
      .then(res => {
        setDrives(res.data);
      })
      .catch(e => console.log(e));
  }, []);
  return { drives };
};

export default useSelect;
