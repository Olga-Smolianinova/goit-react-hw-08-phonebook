import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Data
import { authSelectors } from '../../redux/authorization';

// Styles
import './Navigation.scss';

const Navigation = ({ isAuthenticated }) => {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className="nav-link"
        activeClassName="active-nav-link"
      >
        Home
      </NavLink>
      {/* рендер по условию, чтобы страница Заметки не отображалась вообще, если пользователь незалогинен */}
      {isAuthenticated && (
        <NavLink
          exact
          to="/contacts"
          className="nav-link"
          activeClassName="active-nav-link"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);
