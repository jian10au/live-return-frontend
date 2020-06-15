import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';
import { connect } from 'react-redux';
import FormInput from '../elements/FormInput';
import Toggler from '../elements/Toggler';
import AutoCompleteBox from '../elements/AutoCompleteBox';
import styles from './InvestmentForm.module.css';

export class InvestmentForm extends Component {
  state = {
    quote: this.props.investment ? this.props.investment.quote : '',
    exchange: this.props.investment ? this.props.investment.exchange : '',
    entryPrice: this.props.investment ? this.props.investment.entryPrice : '',
    isActive: this.props.investment ? this.props.investment.isActive : true,
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
    this.props.deletePortfolioDisplayed(event, _id);
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

  handleCheckBox = (event) => {
    event.persist();
    // here, I have a very weird problem with the event;
    // if i do not add event.persist; it seems to me;
    // the event will be lost and becomes the null
    // therefore the below line will not work
    // I don't know why this is the case in this case
    this.setState((prevState) => {
      return { [event.target.name]: !prevState.isActive };
    });
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
    console.log({ ...this.state, portfolioId: this.props.portfolioId });
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
    const { toggle, portfolioId, investmentId, use } = this.props;
    console.log(portfolioId, 'my id is');
    const {
      quote,
      exchange,
      entryPrice,
      exitPrice,
      quantity,
      isActive,
    } = this.state;
    return (
      <div className={styles.container}>
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
            name="quantity"
            displayName="number of shares"
            placeholder="number of shares"
            data={quantity}
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
            className={styles.toggle}
            onChange={this.handleCheckBox}
            type="toggle"
            id={investmentId}
            name={'isActive'}
            displayName=""
            data={isActive}
          />

          {this.state.isActive ? null : (
            <FormInput
              onChange={this.handleChange}
              type="text"
              name="exitPrice"
              displayName="Exit Price"
              placeholder="Exit price"
              data={exitPrice}
            />
          )}
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
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              quote,
              entryPrice,
              quantity,
              isActive,
              exitPrice,
            });
          })}

          <button onClick={this.handleClose}>X</button>
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

export default connect(mapStateToProps)(InvestmentForm);
