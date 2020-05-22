import React, { Component } from 'react';
import { httpRequest } from '../utils/axios';
import { connect } from 'react-redux';

export class PortfolioInvestments extends Component {
  state = { investments: null };

  async componentDidMount() {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;

    try {
      console.log('what happens in here here');
      const response = await httpRequest.get(
        `/portfolioinvestments/${this.props.portfolioId}`,
        config
      );
      this.setState({
        investments: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderPortfolioInvestments = () => {
    console.log(this.state, 'log out the state');
    const investmentList = this.state.investments.map((investment) => {
      return (
        <div key={investment._id}>
          <form>
            <label>Quote</label>
            <input></input>
            <label>Exchange</label>
            <input></input>
            <label>Entry Price</label>
            <input></input>
          </form>
        </div>
      );
    });
    return investmentList;
  };

  render() {
    return this.state.investments && this.renderPortfolioInvestments();
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};

export default connect(mapStateToProps)(PortfolioInvestments);
