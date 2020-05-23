import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';
import { connect } from 'react-redux';
import InvestmentForm from '../investments/InvestmentForm';
import Toggler from '../elements/Toggler';

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
        <Toggler
          defaultDisplay={true}
          key={investment._id}
          render={(toggle, on) => {
            // notice, here I change the on to on value to be true; which is contrary to the default setting of
            // a toggler

            return on ? <InvestmentForm toggle={toggle} /> : null;
          }}
        />
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
