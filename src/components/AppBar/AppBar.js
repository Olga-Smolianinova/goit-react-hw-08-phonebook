import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Data
import { authSelectors } from '../../redux/authorization';

// Components
import Navigation from '../Navigation';
import AuthNavigation from '../AuthNavigation';
import UserMenu from '../UserMenu';

// Styles
import './AppBar.scss';

const AppBar = ({ isAuthenticated }) => {
  return (
    <header className="header">
      <Navigation />

      {/* рендер по условию - prop {isAuthenticated} - залогиненный или незалогиненный пользователь. В зависимости от этого будет рендерить либо <UserMenu - информация о пользователе /> или <AuthNav  */}
      {isAuthenticated ? <UserMenu /> : <AuthNavigation />}
    </header>
  );
};

AppBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);
