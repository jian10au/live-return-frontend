import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../actions/authActions';
import SignInForm from '../components/SignInForm';

//form component in here does follow the controlled component pattern and please note that;
//the clear function is achieved through the using the react.createRef

export class _SignInPage extends Component {
  constructor(props) {
    super(props);
    // this.inputEmailRef = React.createRef();
    // this.inputPasswordRef = React.createRef();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('signin gets clicked');
    await this.props.signIn(this.state);
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  handleClear = () => {
    this.inputEmailRef.current.value = '';
    this.inputPasswordRef.current.value = '';
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            ref={this.inputEmailRef}
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="Enter details"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            ref={this.inputPasswordRef}
            onChange={this.handleChange}
            type="text"
            name="password"
            id="password"
            placeholder="Enter details"
            required
          />
          <br />
          <button>Sign In</button>
          <button>Clear</button>
        </form>
        <Link to="/signup">Need to sign Up?</Link>
        {this.props.error.id === 'signin_fail' ? (
          <div>{this.props.error.msg.msg}</div>
        ) : null}
        <SignInForm />
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  console.log(AppState, 'AppState from SignInPage');

  return {
    isAuthenticated: AppState.auth.isAuthenticated,
    error: AppState.error,
  };
};

export const SignInPage = connect(mapStateToProps, { signIn })(_SignInPage);
