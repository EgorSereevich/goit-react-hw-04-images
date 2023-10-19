import { React, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Заповніть пошук', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    onSubmit(query);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label"></span>
        </button>

        <input
          value={query}
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
