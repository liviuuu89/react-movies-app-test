import React, { useEffect, useState } from 'react';
import './MovieGrid.css';
import { movieService } from '../../services/movieService';
import MovieCard from '../MovieCard/MovieCard';

const MovieGrid = ({ toggleFavorite, favoriteMovies }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    
    const loadMovies = () => {
      setLoading(true);
      movieService.loadMovies();
      setTimeout(() => setLoading(false), 1000);
    };
  
    useEffect(() => {
      const genreSubscription = movieService.genres$.subscribe(setGenres);

      const subscription = movieService.movies$.subscribe(movies => {
        setMovies(movies);
        setLoading(false);
      });
      loadMovies();
      movieService.loadGenres();

      window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
          loadMovies();
        }
      };
  
      return () => {
        subscription.unsubscribe();
        genreSubscription.unsubscribe();

        window.onscroll = null;
      };
    }, []);
  
    return (
      <div className="movie-grid">
        {loading && <div className="loader">Loading...</div>}
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleFavorite={toggleFavorite}
            isFavorite={favoriteMovies.some(fav => fav.id === movie.id)}
          />
        ))}
      </div>
    );
};

export default MovieGrid;
