import React from 'react';

const Item = ({ item, className, forwardRef, children }) => {
  return (
    <div key={item._id} className={className} ref={forwardRef}>
      <>{children}</>
    </div>
  );
};

const Link = ({ href, onClick, children }) => {
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
};

const EditButton = ({ id, className, onClick, children }) => {
  return (
    <div id={id} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

const Input = ({ className, path }) => {
  return <input className={className} type='text' value={path} />;
};

export { Item, Link, EditButton, Input };
