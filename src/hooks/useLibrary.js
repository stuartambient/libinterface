/* import { useEffect } from 'react'; */
import Axios from 'axios';

const useLibrary = () => {
  const getData = async params => {
    const { page, limit } = params.formValues;
    if (!params) return;

    try {
      const res = await Axios.get(
        `http://localhost:3001/api/v1/library/music/getTitles?&page=${page}&limit=${limit}`
      );
      /* params.setEntries(res.data.documents); */
    } catch (error) {
      console.log(error);
    }
  };
  /*  if (!entries) {
      getData();
    } */

  /*  useEffect(() => {
    const getLocations = async () => {
      try {
        const res = await Axios(
          `http://localhost:3001/api/v1/library/music/getLocations`
        );
        if (res) console.log('locations: ', res);
      } catch (error) {
        throw new Error(error.message);
      }
    };
  }); */
  return { getData };
};
export default useLibrary;
