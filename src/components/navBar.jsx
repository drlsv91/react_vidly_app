import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand navbar-light bg-light'>
        <Link to='/' className='navbar-brand nav-link'>
          Vidly
        </Link>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav'>
            <NavLink to='/movies' className='nav-item nav-link'>
              Movies
            </NavLink>
            <NavLink to='/customers' className='nav-item nav-link'>
              Customers
            </NavLink>
            <NavLink to='/rentals' className='nav-item nav-link'>
              Rentals
            </NavLink>
            <NavLink to='/login' className='nav-item nav-link'>
              Login
            </NavLink>
            <NavLink to='/register' className='nav-item nav-link'>
              Register
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
