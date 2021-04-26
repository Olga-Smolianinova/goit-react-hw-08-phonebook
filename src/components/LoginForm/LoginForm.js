import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Data
import { authOperations } from '../../redux/authorization';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  //МЕТОДЫ
  //Получение данных из input
  handleChange = ({ target: { name, value } }) => {
    // console.log(value);
    this.setState({ [name]: value });
  };

  // Отправка данных из формы
  handleSubmit = event => {
    event.preventDefault();

    // // если отсутствуют данные
    // console.log(this.state.email);
    // console.log(this.state.password);
    if (!this.state.email || !this.state.password) {
      alert('Fill the Login form');
      return;
    }

    // вызов dispatch onLogin
    this.props.onLogin(this.state);
    // очистка данных в форме
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="UserMenu">
        <h2 className="header-title">Login Page</h2>

        {/* форма из bootstrap. Подключение в index.html */}
        <form
          onSubmit={this.handleSubmit} //autoComplete="off"
        >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>

            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={this.handleChange}
            />

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  //для dispatch нужны authOperations для регистрации
  onLogin: authOperations.logIn,
};

export default connect(null, mapDispatchToProps)(LoginPage);
