import { from, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap, catchError, tap } from 'rxjs/operators';

const apiKey = 'b46c2b4ff7141932db2ea8d804653f92';
const baseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey;
let currentPage = 1;
let totalPages = 1;
const searchSubject = new Subject();
const movieSubject = new BehaviorSubject([]);

const sortMoviesAlphabetically = (movies) => {
  return movies.sort((a, b) => a.title.localeCompare(b.title));
};

export const movieService = {
  movies$: movieSubject.asObservable(),
  loadMovies() {
    if (currentPage <= totalPages) {
      const url = `${baseUrl}&page=${currentPage}`;
      from(fetch(url).then(res => res.json()))
      .pipe(
        tap(response => {
          totalPages = response.total_pages;
          let sortedMovies = sortMoviesAlphabetically(response.results);
          const currentMovies = movieSubject.getValue();
          const updatedMovies = [...currentMovies, ...sortedMovies].filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );
          movieSubject.next(updatedMovies);
          currentPage++;
        }),
        catchError(error => {
          console.error('A apărut o eroare:', error.message);
          return [];
        })
      ).subscribe();
    }
  },
  searchMovies(term) {
    currentPage = 1;
    searchSubject.next(term);
  },

};

searchSubject.pipe(
  debounceTime(500),
  switchMap(term => {
    if (term === '') {
      return from(fetch(`${baseUrl}&page=1`).then(res => res.json()));
    } else {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`;
      return from(fetch(searchUrl).then(res => res.json()));
    }
  }),
  tap(response => {
    let sortedMovies = sortMoviesAlphabetically(response.results);
    movieSubject.next(sortedMovies);
  }),
  catchError(error => {
    console.error('Eroare la căutare:', error);
    return [];
  })
).subscribe();

