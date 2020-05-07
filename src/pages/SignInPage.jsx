import React, { Component } from 'react';
import { connect } from 'react-redux';
import { httpRequest } from '../utils/axios';
import { Link } from 'react-router-dom';
import { signIn } from '../actions/authActions';
import { timingSafeEqual } from 'crypto';

export class _SignInPage extends Component {
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('signin gets clicked');
    await this.props.signIn(this.state);
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="Enter details"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="password"
            id="password"
            placeholder="Enter details"
            required
          />
          <br />
          <button>Sign In</button>
        </form>
        <Link to="/signup">Need to sign Up?</Link>
        {this.props.error.id === 'signin_fail' ? (
          <div>{this.props.error.msg.msg}</div>
        ) : null}
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
