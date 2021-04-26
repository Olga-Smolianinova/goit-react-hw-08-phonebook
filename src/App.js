import React, { Component, Suspense, lazy } from 'react';

import { Switch } from 'react-router-dom';

import { connect } from 'react-redux';

// Data
import { authOperations } from './redux/authorization';

// Route
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

// Components
import Container from './components/Container';
import AppBar from './components/AppBar';

// Pages. Lazy. Chunk
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);

const ContactsPage = lazy(() =>
  import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
);

const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);

class App extends Component {
  //  ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    //вызов onGetCurrentUser, в operations прописана логика  для того, чтобы сохранить текущего пользователя, а не выполнять логизацию каждый раз после обновления страницы; 1) сохраняем token в local storage и получаем к нему доступ через getState
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <Container>
        <AppBar />

        <Suspense fallback={<p>Loading in progress...</p>}>
          <Switch>
            <PublicRoute exact path="/" component={HomePage} />

            {/* чтобы не отображать содержимое Contacts страницы незалогиненному пользователю */}
            <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={ContactsPage}
            />

            {/* когда пользователь залогинен, ему не должны отображаться на определенные страницы, например регистрации и логинизации;  restricted - ограниченый маршрут */}
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={RegisterPage}
            />

            <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts"
              component={LoginPage}
            />
          </Switch>
        </Suspense>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
