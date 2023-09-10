import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState(''); 

  const handleChange = evt => {
    const { value } = evt.target;
    setSearch(value);
  };

  const resetForm = () => {
    setSearch('');
  };

  const handleSubmit = evt => {
    evt.preventDefault(); 
    onSearch(search);
    resetForm();
  };

  return (
    <header className={css.Searchbar} onSubmit={handleSubmit}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchForm_button}></button>
        <input
          className={css.SearchForm_input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
