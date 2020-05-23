import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';
import { connect } from 'react-redux';
import FromInput, { FormInput } from '../elements/FormInput';

export class InvestmentForm extends Component {
  state = {
    quote: '',
    exchange: '',
    entryPrice: null,
    exitPrice: null,
    portfolioId: this.props.portfolioId,
  };

  handleClose = (event) => {
    event.preventDefault();
    this.props.toggle(event);
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
    const { toggle, portfolioId } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            onChange={this.handleChange}
            type="text"
            name="quote"
            placeholder="quote"
            displayName="Stock Quote"
          />

          <FormInput
            onChange={this.handleChange}
            type="text"
            name="exchange"
            displayName="Exchange"
            placeholder="exchange"
          />

          <FormInput
            onChange={this.handleChange}
            type="text"
            name="entryPrice"
            displayName="Entry Price"
            placeholder="entry price"
          />
          <FormInput type="text" placeholder={portfolioId} />

          <button onClick={this.handleSubmit}>Create</button>
          <button onClick={this.handleClose}>X</button>
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
