import React, { useState } from 'react';
import { movieService } from '../../services/movieService'; 
import './SearchBar.css'; 

const SearchBar = () => {
  const [term, setTerm] = useState('');

  const onInputChange = (event) => {
    setTerm(event.target.value);
    movieService.searchMovies(event.target.value);
  };

  return (
    <div className='search-bar-container'>
      <input type="text" value={term} onChange={onInputChange} />
      <button className='search-button' onClick={() => movieService.searchMovies(term)}>Caută</button>
    </div>
  );
};

export default SearchBar;