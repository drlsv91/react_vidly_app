import config from '../config.json';
import http from './httpService';
// import * as genresAPI from './fakeGenreService';

// const movies =
export function getMovies() {
  return http.get(config.movies);
}

// export function getMovie(id) {
//   return movies.find((m) => m._id === id);
// }

// export function saveMovie(movie) {
//   let movieInDb = movies.find((m) => m._id === movie._id) || {};
//   movieInDb.title = movie.title;

//   movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
//   movieInDb.numberInStock = movie.numberInStock;
//   movieInDb.dailyRentalRate = movie.dailyRentalRate;

//   if (!movieInDb._id) {
//     movieInDb._id = Date.now().toString();
//     movies.push(movieInDb);
//   }

//   return movieInDb;
// }

export function deleteMovie(movieId) {
  return http.delete(config.movies + '/' + movieId);
}
