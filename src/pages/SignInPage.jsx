import React, { Component } from 'react';
import { connect } from 'react-redux';
import { httpRequest } from '../utils/axios';
import { Link } from 'react-router-dom';
import { signIn } from '../actions/authActions';

export class _SignInPage extends Component {
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signIn(this.state);
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
          <button onClick={this.handleSubmit}>Sign In</button>
        </form>
        <Link to="/signup">Need to sign Up?</Link>
        <Link to="/dashboard">To Dashboard if auth passes</Link>
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  console.log(AppState);
  return {};
};

export const SignInPage = connect(mapStateToProps, { signIn })(_SignInPage);
