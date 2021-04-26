import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Data
import { authSelectors } from '../redux/authorization';

// вместо компонента Route в App.js будет другой  PrivateRoute. Это нужно для того, чтобы при переходе на какую-либо страницу приложения ее содержимое  НЕ ДОЛЖНО отрисовываться, если пользователь незалогинен

// PrivatePoute будет получать те же данные, что и обычный Route в App.js, но будет добавлять соответствущие условия и проверки, чтобы незалогиненый пользователь не мог перейти на страницу приложения (Contacts), предназначенную только для залогиненных

//  Если маршрут приватный и пользователь залогинен, рендерит компонент
//  В противном случае рендерит Redirect на /login

const PrivateRoute = ({
  //деструктуризируем все props из App.js
  component: Component, //переименовываем component с Заглавной буквы, чтобы redux считывал это как компонент, иначе, не будет рендерится
  isAuthenticated, //из authSelectors
  redirectTo,
  ...routeProps //и все остальное (path)
}) => (
  <Route
    {...routeProps}
    render={props =>
      // рендер по условию. Если пользователь авторизирован, то отрендери Component (страница Contacts), если нет - переведи на страницу Login
      isAuthenticated ? <Component {...props} /> : <Redirect to={redirectTo} />
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(PrivateRoute);
