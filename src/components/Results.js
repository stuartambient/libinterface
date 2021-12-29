import React, { useState } from 'react';
import '../styles/Results.css';

const Results = props => {
  /* const [currentItems, setCurrentItems] = useState(props.entries); */
  /*   const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);  */

  const dataSet = props.entries.map(item => item);

  /* const [pagination, setPagination] = useState({
    data: props.entries,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    setPagination(prevState => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset]);

  const handlePageClick = event => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  }; */

  return (
    <div className="results">
      {dataSet &&
        dataSet.map((item, index) => (
          <div className="item" key={item._id}>
            <a href={item.path}>{item.name}</a>
          </div>
        ))}

      {/* <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pagination.pageCount}
        pageClassName={'page'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      /> */}
    </div>
  );
};

export default Results;
