import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Data
import { authSelectors } from '../redux/authorization';
// когда пользователь залогинен, ему не должны отображаться на определенные страницы, например регистрации и логинизации;  restricted - ограниченый маршрут

/**
 * - Если маршрут ограниченный (т.е. когда пользователь залогинен, он не должен попасть на определенные страницы, например страницы регистрации и логинизации), и пользователь залогинен, рендерит редирект на /todos
 * - В противном случае рендерит компонент
 */
const PublicRoute = ({
  //деструктуризируем все props из App.js
  component: Component, //переименовываем component с Заглавной буквы, чтобы redux считывал это как компонент, иначе, не будет рендерится
  isAuthenticated, //из authSelectors
  redirectTo,
  ...routeProps //и все остальное (path, restricted)
}) => (
  <Route
    {...routeProps}
    render={props =>
      // рендер по условию  если пользователь залогинен  && и маршрут ограниченый (restricted), то перенаправление
      isAuthenticated && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(PublicRoute);
