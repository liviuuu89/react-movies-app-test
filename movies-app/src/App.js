import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Favorites from './components/Favorites/Favorites';
import './App.css';

const App = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (movie) => {
    const isFavorite = favoriteMovies.some(fav => fav.id === movie.id);
    const updatedFavorites = isFavorite
      ? favoriteMovies.filter(fav => fav.id !== movie.id)
      : [...favoriteMovies, movie];
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <SearchBar />
        <div className='menu'>
        <button  className='menuItem' onClick={() => setShowFavorites(!showFavorites)}>Vezi Favoritele</button>
        </div>
        
      </div>
      {showFavorites ? (
        <Favorites favoriteMovies={favoriteMovies} toggleFavorite={toggleFavorite} setShowFavorites={setShowFavorites} />
      ) : (
        <MovieGrid toggleFavorite={toggleFavorite} favoriteMovies={favoriteMovies} />
      )}
    </div>
  );
};

export default App;
