import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Data
import { authOperations } from '../../redux/authorization';

class SignupForm extends Component {
  state = {
    name: '',
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

    // если отсутствуют данные
    if (!this.state.name || !this.state.email || !this.state.password) {
      alert('Fill the Registration form');
      return;
    }

    // вызов dispatch onRegister
    this.props.onRegister(this.state);

    // очистка данных в форме
    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <div className="UserMenu">
        <h2 className="header-title">Registration Page</h2>

        {/* форма из bootstrap. Подключенo в index.html */}
        <form
          onSubmit={this.handleSubmit} //autoComplete="off"
        >
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>

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
              placeholder={'More than 7 symbols'}
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

SignupForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  //для dispatch нужны authOperations для регистрации
  onRegister: authOperations.register,
};

export default connect(null, mapDispatchToProps)(SignupForm);
