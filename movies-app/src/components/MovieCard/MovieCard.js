import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Lansat: {movie.release_date}</p>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite ? 'Șterge de la Favorite' : 'Adaugă la Favorite'}
      </button>
    </div>
  );
};

export default MovieCard;
