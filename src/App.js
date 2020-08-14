import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />

      <main className='container mt-5'>
        <Switch>
          <Route path='/movies/:id' component={MovieForm} />
          <Route exact path='/movies' component={Movies} />
          <Route path='/customers' component={Customers} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/not-found' component={NotFound} />
          <Redirect exact from='/' to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
