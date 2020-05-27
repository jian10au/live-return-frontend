import React, { Component } from 'react';
import { httpRequest } from '../utils/axios';
import { Navigation } from '../components/Navigation';
import { connect } from 'react-redux';

export class InvestmentsPage extends Component {
  state = {
    investments: null,
  };

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
      const response = await httpRequest.get(`/user/portfolios`, config);
      this.setState({
        investments: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderInvestmentsList = () => {
    const { investments } = this.state;
    const investmentList = investments.map((investment) => (
      <div key={investment._id}>
        <h3>{investment.name}</h3>
        <p>{investment.description}</p>
        <p>{investment.entryPrice}</p>
        <p>{investment.exitPrice}</p>
        <div>Where am I</div>
        <hr />
      </div>
    ));
    return investmentList;
  };

  render() {
    const { investments } = this.state;
    return (
      <div>
        <Navigation />
        <h2>Show All My Investments</h2>
        {investments ? this.renderInvestmentsList() : <div>Loading</div>}
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};

export default connect(mapStateToProps)(InvestmentsPage);
