import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onHandleNextPage }) => {
  return (
    <button className={css.Button} type="button" onClick={onHandleNextPage}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onHandleNextPage: PropTypes.func,
};
export default Button;
