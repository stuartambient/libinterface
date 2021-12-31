import Axios from 'axios';

const useDb = () => {
  const loadMore = async (page, limit) => {
    try {
      const res = await Axios.get(
        `http://localhost:3001/api/v1/library/music/getTitles?&page=${page}&limit=${limit}`
      );
    } catch (e) {
      console.log('😲 - Error: ', e.message);
    }
  };

  return { loadMore };
};

export default useDb;
