import React, { Component } from 'react';
import { httpRequest } from '../utils/axios';
import { connect } from 'react-redux';

export class InvestmentForm extends Component {
  state = {
    quote: '',
    exchange: '',
    entryPrice: null,
    exitPrice: null,
    portfolioId: this.props.portfolioId,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;
    try {
      const response = await httpRequest.post(
        `/investments`,
        this.state,
        config
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    const { displayFormToggle, portfolioId } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="quote"
            placeholder="quote"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="exchange"
            placeholder="exchange"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="entryPrice"
            placeholder="entry price"
          />
          <input type="text" placeholder={portfolioId} />
          <button onClick={this.handleSubmit}>Create</button>
          <button onClick={displayFormToggle}>X</button>
        </form>
        <hr />
      </>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};

export default connect(mapStateToProps)(InvestmentForm);
