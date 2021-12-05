import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
  if (props.href) {
    return (
      <a className={`button ${props.className}`} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button ${props.className}`}
      >
        {props.children}
      </Link>
    );
  }
  
  return (
    <button
      className={`button ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;
