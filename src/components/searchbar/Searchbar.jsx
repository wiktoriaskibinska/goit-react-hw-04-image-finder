import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <div className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </div>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
