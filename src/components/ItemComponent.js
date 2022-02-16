import React from 'react';

const Item = ({ item, className, forwardRef, children }) => {
  /*  const [el1, el2] = children;
  const { ...link } = el1.props;
  const { ...btn } = el2.props; */

  return (
    <div key={item._id} className={className} ref={forwardRef}>
      {/* <Link href={link.href} onClick={link.onClick} children={link.children} />
      <EditButton
        id={btn.id}
        className={btn.className}
        onClick={btn.onClick}
        children={btn.children}
      ></EditButton> */}
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

export { Item, Link, EditButton };
