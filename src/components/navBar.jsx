import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
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

          {!user && (
            <React.Fragment>
              <NavLink to='/login' className='nav-item nav-link'>
                Login
              </NavLink>
              <NavLink to='/register' className='nav-item nav-link'>
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink to='/profile' className='nav-item nav-link'>
                {user.name}
              </NavLink>
              <NavLink to='/logout' className='nav-item nav-link'>
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
