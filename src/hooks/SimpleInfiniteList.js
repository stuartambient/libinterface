import React, { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import useDb from './useDb';
import { Results, List, ListItem, Loading } from '../components/Results';

const { loading, items, hasNextPage, error, loadMore } = useDb;

function SimpleInfiniteList(props) {
  const [items, addItems] = useState();
  const [itemsTotal, setItemsTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: hasNextPage(page, 50),
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    /* disabled: !!error, */
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    /*  rootMargin: '0px 0px 400px 0px', */
  });

  return (
    <Results ref={rootRef}>
      <List>
        {items.map(item => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {(loading || hasNextPage) && (
          <ListItem ref={sentryRef}>
            <Loading />
          </ListItem>
        )}
      </List>
    </Results>
  );
}

export default SimpleInfiniteList;
