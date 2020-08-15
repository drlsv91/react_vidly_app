import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
class MoviesTable extends Component {
  columns = [
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
      content: (movie) => (
        <Like handleOnClick={this.props.onLiked} movie={movie} />
      ),
    },
  ];
  deleteColumn = {
    key: 'delete',
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className='btn btn-danger'
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies, sortedColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortedColumn={sortedColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
