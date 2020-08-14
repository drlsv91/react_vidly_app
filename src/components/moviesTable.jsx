import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  render() {
    const { movies, onLiked, onDelete, sortedColumn, onSort } = this.props;
    const columns = [
      {
        path: 'title',
        label: 'TItle',
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: 'genre.name', label: 'Genre' },
      { path: 'numberInStock', label: 'Stock' },
      { path: 'dailyRentalRate', label: 'Rate' },
      {
        key: 'like',
        content: (movie) => <Like handleOnClick={onLiked} movie={movie} />,
      },
      {
        key: 'delete',
        content: (movie) => (
          <button
            onClick={() => onDelete(movie._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        sortedColumn={sortedColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
