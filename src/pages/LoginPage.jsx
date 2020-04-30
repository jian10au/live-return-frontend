import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { fetchAuthData } from '../actions/authActions';
import { httpRequest } from '../utils/axios';
import { Link, Redirect } from 'react-router-dom';

export class _LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.props.fetchAuthData(this.state);
      this.props.history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            defaultValue="Provide a username"
          />
          <br />
          <input
            onChange={this.handleChange}
            type="text"
            name="password"
            defaultValue="Provide passwords"
          />
          <br />
          <button>Create a new user</button>
          <button>Sign In</button>
        </form>

        <button
          onClick={async () => {
            try {
              const res = await httpRequest.get(
                'http://localhost:5502/investments'
              );
              console.log(res);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Test
        </button>

        <Link to={'/investments'}>Here</Link>
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  console.log(
    AppState,
    'I maybe do not need to have global state in Login Page'
  );
  return {};
};

export const LoginPage = connect(mapStateToProps, { fetchAuthData })(
  _LoginPage
);
