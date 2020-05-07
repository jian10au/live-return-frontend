import React, { Component } from 'react';
import { Navigation } from '../components/Navigation';
import { httpRequest } from '../utils/axios';
import Axios from 'axios';
import { connect } from 'react-redux';

class _EditPortfolioPage extends Component {
  state = {
    name: '',
    description: '',
    displayInvestmentForm: false,
  };

  async componentDidMount() {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;

    const response = await httpRequest.get(
      `/portfolios/${this.props.match.params.id}`,
      config
    );
    this.setState({
      name: response.data.name,
      description: response.data.description,
    });
  }

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
      const response = await httpRequest.put(
        `/portfolios/${this.props.match.params.id}`,
        this.state,
        config
      );
      this.props.history.push('/user/portfolios');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <Navigation />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Portfolio Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
            defaultValue={this.state.name}
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
            defaultValue={this.state.description}
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

export const EditPortfolioPage = connect(mapStateToProps)(_EditPortfolioPage);
