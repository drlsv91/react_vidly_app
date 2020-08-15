import React, { Component } from 'react';
import _ from 'lodash';
import Pagination from './common/pagination';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/moviesService';
import { paginate } from './utils/paginate';
import { getGenres } from '../services/genreService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    genreMovies: [],
    selectedGenre: null,
    sortedColumn: { path: 'title', orderBy: 'asc' },
    searchStr: '',
  };
  async componentDidMount() {
    const { data: genresData } = await getGenres();
    const { data: moviesData } = await getMovies();
    const genres = [{ _id: '', name: 'All Genres' }, ...genresData];
    this.setState({ movies: moviesData, genres });
  }
  handleDeleteMovie = async (id) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((movie) => movie._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted');
      this.setState({ movies: originalMovies });
    }
  };
  handleLiked = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    let selectedGenre = this.state.currentGenre;
    selectedGenre = genre;
    this.setState({ selectedGenre, currentPage: 1, searchStr: '' });
  };
  handleSort = (sortedColumn) => {
    this.setState({ sortedColumn });
  };
  filterMovies = () => {
    const { movies: allMovies, selectedGenre, searchStr } = this.state;

    const searchedMovies = allMovies.filter((m) =>
      m.title.toLowerCase().includes(searchStr.trim().toLowerCase())
    );

    if (searchedMovies.length > 0) return searchedMovies;
    else if (selectedGenre && selectedGenre._id)
      return this.state.movies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    else return allMovies;

    // return selectedGenre && selectedGenre._id
    //   ? this.state.movies.filter((movie) => {
    //       return movie.genre._id === selectedGenre._id;
    //     })
    //   : allMovies;
  };

  getPagedData = () => {
    const { currentPage, pageSize, sortedColumn } = this.state;
    const filteredMovies = this.filterMovies();
    const sorted = _.orderBy(
      filteredMovies,
      sortedColumn.path,
      sortedColumn.orderBy
    );
    const movies = paginate(sorted, currentPage, pageSize);
    const totalCount = filteredMovies.length;

    return { data: movies, totalCount };
  };

  handleSearch = (query) => {
    this.setState({ searchStr: query, selectedGenre: null, currentPage: 1 });
  };
  render() {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      sortedColumn,
      searchStr,
    } = this.state;

    const { data: movies, totalCount } = this.getPagedData();
    const { user } = this.props;
    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            genres={this.state.genres}
            selectedGenre={selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          {user && (
            <Link to='/movies/new' className='btn btn-primary'>
              New Movie
            </Link>
          )}
          <h3>
            {movies.length === 0
              ? 'There are No Movies in the Database'
              : `Showing ${totalCount} Movies in the database`}
          </h3>
          <SearchBox value={searchStr} onChange={this.handleSearch} />
          <MoviesTable
            onDelete={this.handleDeleteMovie}
            onLiked={this.handleLiked}
            onSort={this.handleSort}
            movies={movies}
            sortedColumn={sortedColumn}
          />
          <Pagination
            pageCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
