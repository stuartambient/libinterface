import axios from 'axios';
import { useEffect, useState } from 'react';

const useNode = fileLink => {
  const [link, setLink] = useState(null);
  if (fileLink) setLink(fileLink);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3001/api/v1/library/music/openWinFolder/`,
      params: { link: link },
    }).then(res => console.log(res));
  });
  return { link };
};

export default useNode;
