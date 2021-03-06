import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/moviesService';

class MovieForm extends Form {
  state = {
    data: { title: '', numberInStock: '', dailyRentalRate: '', genreId: '' },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number In Stock'),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label('Daily Rental Rate'),
    genreId: Joi.string().required('Genre'),
  };
  createMovie = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      dailyRentalRate: movie.dailyRentalRate,
      numberInStock: movie.numberInStock,
    };
  };
  populateGenre = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
  };

  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.createMovie(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  };
  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push('/movies');
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    return (
      <React.Fragment>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
          {this.renderButton('save')}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
