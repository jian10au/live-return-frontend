import React, { Component } from 'react';
import { Navigation } from '../components/Navigation';
import { httpRequest } from '../utils/axios';
import { connect } from 'react-redux';

export class PortfolioNewPage extends Component {
  state = {
    name: '',
    description: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;

    event.preventDefault();
    try {
      const response = await httpRequest.post(
        '/portfolios',
        this.state,
        config
      );
      this.props.history.push('/user/portfolios');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.props, 'localProps is');
    console.log(this.state, 'localState is');
    return (
      <div>
        <Navigation />
        <h2>Provide details to create a new portfolio in here</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Portfolio Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
            placeholder="Provide name"
            required
          />
          <br />

          <br />

          <label htmlFor="description">Description</label>
          <textarea
            onChange={this.handleChange}
            type=""
            name="description"
            id="description"
            placeholder="Provide description"
            required
          />
          <br />
          <button>Confirm</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};

export default connect(mapStateToProps)(PortfolioNewPage);
