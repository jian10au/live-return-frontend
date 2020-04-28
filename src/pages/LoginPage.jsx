import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { fetchUserAndJWT } from '../actions/userActions';
import axios from 'axios';
import { httpRequest } from '../utils/axios';
import { Link } from 'react-router-dom';

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
    console.log('submit button working');
    console.log(this.state);
    this.props.fetchUserAndJWT(this.state);
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
  console.log(AppState);
  return { user: AppState.user };
};

export const LoginPage = connect(mapStateToProps, { fetchUserAndJWT })(
  _LoginPage
);
