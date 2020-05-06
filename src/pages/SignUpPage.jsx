import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { httpRequest } from '../utils/axios';
import { Link, Redirect } from 'react-router-dom';
import PageRouter from '../PageRouter';
import App from '../App';

export class _SignUpPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    console.log(this.state, 'this gets submitted?');
    event.preventDefault();
    await this.props.register(this.state);
    this.props.history.push('/dashboard');
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            id="username"
            placeholder="Enter details"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="Enter details"
            required
          />

          <br />

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

          <button>Create a new user</button>
          <Link to="/dashboard">To Dashboard if auth passes</Link>
        </form>
        {this.props.errorPrompt ? this.props.errorPrompt.msg.msg : null}
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  console.log(AppState);
  return { errorPrompt: AppState.error, appState: AppState };
};

export const SignUpPage = connect(mapStateToProps, { register })(_SignUpPage);
