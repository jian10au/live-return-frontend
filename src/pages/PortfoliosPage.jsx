import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import InvestmentForm from '../components/investments/InvestmentForm';
import PortfolioInvestments from '../components/investments/PortfolioInvestments';

import { httpRequest } from '../utils/axios';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';
import Toggler from '../components/elements/Toggler';
import RealTimePriceFetcher from '../components/elements/RealTimePriceFetcher';
import ReturnCalculator from '../components/elements/ReturnCalculator';
import styles from './PortfoliosPage.module.css';

class PortfoliosPage extends React.Component {
  state = {
    portfolios: null,
  };

  handleDelete = async (id) => {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;
    try {
      const response = await httpRequest.delete(`/portfolios/${id}`, config);
      const updatedPortfolio = this.state.portfolios.filter(
        (portfolio) => portfolio._id !== id
      );
      this.setState({ portfolios: updatedPortfolio });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    const { authToken } = this.props;
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    config.headers['x-auth-token'] = authToken;
    const response = await httpRequest.get('/user/portfolios', config);
    this.setState({ portfolios: response.data });
  }

  renderList() {
    const { portfolios } = this.state;
    return portfolios.map((portfolio) => {
      return (
        <div className={styles.portfolioContainer} key={portfolio._id}>
          <h3>{portfolio.name}</h3>
          <p>{portfolio.description}</p>
          <Link to={`/user/portfolios/edit/${portfolio._id}`}>Edit</Link>
          <button onClick={() => this.handleDelete(portfolio._id)}>
            Delete
          </button>
          <Toggler
            defaultDisplay={false}
            render={(toggle, on) => (
              <div>
                <button onClick={toggle}>Add Investment</button>
                {on ? (
                  <>
                    <InvestmentForm
                      use="create"
                      portfolioId={portfolio._id}
                      toggle={toggle}
                    >
                      <RealTimePriceFetcher />
                    </InvestmentForm>
                  </>
                ) : null}
              </div>
            )}
          />

          <Toggler
            defaultDisplay={false}
            render={(toggle, on) => (
              <div>
                <button onClick={toggle}>Show Investments</button>
                {on ? (
                  <PortfolioInvestments portfolioId={portfolio._id} />
                ) : null}
              </div>
            )}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={styles.page}>
        <Navigation />
        <h1>Show All My Portfolios</h1>
        {this.state.portfolios && this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};
export default connect(mapStateToProps)(PortfoliosPage);
