import React, { useState } from 'react';
import useDb from './useDb';

const useLoadItems = () => {
  const [numOfItems, setItems] = useState([]);
  const loading = 'is fetching...';
  const hasNextPage = () => (numOfItems.length > 0 ? true : false);

  let onloadMore;
  let rootMargin;
  let disabled;
  let delayInMs;

  return { loading, hasNextPage, onloadMore, rootMargin, disabled, delayInMs };
};
export default useLoadItems;
