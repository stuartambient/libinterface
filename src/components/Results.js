import React from 'react';
import '../styles/Results.css';

export const Results = props => {
  return <div className="results" ref={props.ref}></div>;
};

export const List = () => <ul></ul>;

export const ListItem = props =>
  props.ref ? (
    <li key={props.key} ref={props.ref}>
      {props.name}
    </li>
  ) : (
    <li key={props.key}>{props.name}</li>
  );

export const Loading = () => <h1>.....loading</h1>;
