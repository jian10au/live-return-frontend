import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';
import { connect } from 'react-redux';
import FormInput from '../elements/FormInput';
import Toggler from '../elements/Toggler';
import AutoCompleteBox from '../elements/AutoCompleteBox';

export class InvestmentForm extends Component {
  state = {
    quote: this.props.investment ? this.props.investment.quote : '',
    exchange: this.props.investment ? this.props.investment.exchange : '',
    entryPrice: this.props.investment ? this.props.investment.entryPrice : '',
    exitPrice: this.props.investment ? this.props.investment.exitPrice : '',

    quantity: this.props.investment ? this.props.investment.quantity : '',
  };

  handleClose = (event) => {
    event.preventDefault();
    this.props.toggle(event);
  };

  setQuoteInput = (event) => {
    const quoteFullStr = event.target.innerHTML;
    const quote = quoteFullStr.split(' ')[0];

    this.setState({ quote: quote });
  };

  handleUpdate = async (event) => {
    const { _id } = this.props.investment;
    event.preventDefault();

    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;

    try {
      await httpRequest.put(
        `/investments/${_id}`,
        { ...this.state, portfolioId: this.props.portfolioId },
        config
      );
      console.log('investments successfully updated');
    } catch (err) {
      console.log(err);
    }

    console.log('Delete clicked');
  };

  handleDelete = async (event) => {
    const { _id } = this.props.investment;
    event.preventDefault();

    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;
    console.log(authToken);
    try {
      await httpRequest.delete(`/investments/${_id}`, config);
      console.log('investments successfully deleted');
    } catch (err) {
      console.log(err);
    }

    console.log('Delete clicked');
  };

  handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCreate = async (event) => {
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
        { ...this.state, portfolioId: this.props.portfolioId },
        config
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    const { toggle, portfolioId, investment, use } = this.props;
    const { quote, exchange, entryPrice, exitPrice, quantity } = this.state;
    return (
      <>
        <form>
          <Toggler
            defaultDisplay={false}
            render={(toggle, on) => {
              return (
                <>
                  <FormInput
                    onChange={this.handleChange}
                    type="text"
                    name="quote"
                    placeholder="quote"
                    displayName="Stock Quote"
                    data={quote}
                    onClick={toggle}
                  />
                  {on ? (
                    <AutoCompleteBox
                      quote={quote}
                      setQuoteInput={this.setQuoteInput}
                    />
                  ) : null}
                </>
              );
            }}
          />
          <FormInput
            onChange={this.handleChange}
            type="text"
            name="exchange"
            displayName="Exchange"
            placeholder="exchange"
            data={exchange}
          />
          <FormInput
            onChange={this.handleChange}
            type="text"
            name="entryPrice"
            displayName="Entry Price"
            placeholder="entry price"
            data={entryPrice}
          />

          <FormInput
            onChange={this.handleChange}
            type="text"
            name="quantity"
            displayName="number of shares"
            placeholder="number of shares"
            data={quantity}
          />

          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              quote,
              entryPrice,
              quantity,
            });
          })}

          {use === 'create' ? (
            <>
              <button onClick={this.handleCreate}>Create</button>
              <button onClick={this.fetchRealTimePrice}>Real Time Price</button>
            </>
          ) : null}
          {use === 'update' ? (
            <button onClick={this.handleUpdate}>Update</button>
          ) : null}
          {use === 'update' ? (
            <button onClick={this.handleDelete}>Delete</button>
          ) : null}
          <button onClick={this.handleClose}>X</button>
        </form>
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
