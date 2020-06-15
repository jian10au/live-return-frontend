import React, { Component } from 'react';
import { httpRequest } from '../utils/axios';
import { Navigation } from '../components/Navigation';
import { connect } from 'react-redux';
import styles from './InvestmentsPage.module.css';

export class InvestmentsPage extends Component {
  state = {
    investments: [],
  };

  async componentDidMount() {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;

    const investmentIDCollection = [];
    try {
      //fetch the porfolio belonging to the user first;
      const response = await httpRequest.get(`/user/portfolios`, config);

      const portfolios = response.data;

      //loop through portfolio to get all the investments id;

      portfolios.forEach((portfolio) =>
        portfolio.investments.forEach((investmentId) =>
          investmentIDCollection.push(investmentId)
        )
      );

      //for each id fetch its investment information
    } catch (err) {
      console.log(err);
    }

    try {
      investmentIDCollection.forEach(async (investmentID) => {
        const investment = await httpRequest.get(
          `investments/${investmentID}`,
          config
        );
        // investmentsData.push(response.data);
        this.setState((prevState) => {
          return {
            investments: [...prevState.investments, investment.data],
          };
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderInvestmentsList = () => {
    const { investments } = this.state;
    const investmentList = investments.map((investment) => (
      <div className={styles.investmentContainer} key={investment._id}>
        <h3>{investment.name}</h3>
        <p>Quote: {investment.quote}</p>
        <p>Exchange: {investment.exchange}</p>
        <p>Entry Price: {investment.entryPrice}</p>
      </div>
    ));
    return investmentList;
  };

  render() {
    const { investments } = this.state;
    return (
      <div className={styles.page}>
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
