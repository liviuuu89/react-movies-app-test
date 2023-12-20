import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './Favorites.css';

const Favorites = ({ favoriteMovies, toggleFavorite, setShowFavorites  }) => {
  if (favoriteMovies.length === 0) {
    return (
      <div className='noFavoriteMovies'>
        <p>Nu există filme favorite.</p>
        <button  onClick={() => setShowFavorites(false)} className="back-button">Înapoi la filme</button>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>Filme Favorite</h2>
      <div className="favorites-grid">
      {favoriteMovies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={true}
        />
      ))}
      </div>
    </div>
  );
};

export default Favorites;