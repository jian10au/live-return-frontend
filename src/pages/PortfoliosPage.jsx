import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import InvestmentForm from '../components/InvestmentForm';

import { httpRequest } from '../utils/axios';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';

class PortfoliosPage extends React.Component {
  state = {
    portfolios: null,
    displayForm: false,
    displayInvestments: false,
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

  displayFormToggle = () => {
    this.setState({
      displayForm: !this.state.displayForm,
    });
  };

  displayInvestmentsToggle = () => {
    this.setState({
      displayInvestments: !this.state.displayInvestments,
    });
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
    console.log(response.data, 'nothing?');
    this.setState({ portfolios: response.data });
  }

  renderList() {
    const { portfolios } = this.state;
    return portfolios.map((portfolio) => {
      return (
        <div key={portfolio._id}>
          <h3>{portfolio.name}</h3>
          <p>{portfolio.description}</p>
          <Link to={`/user/portfolios/edit/${portfolio._id}`}>Edit</Link>
          <button onClick={this.displayFormToggle}>
            Add Investment {this.state.displayForm ? '(On)' : '(Off)'}{' '}
          </button>
          <button onClick={this.displayInvestmentsToggle}>
            Show Investments included{' '}
            {this.state.displayInvestments ? '(On)' : '(Off)'}{' '}
          </button>
          <button onClick={() => this.handleDelete(portfolio._id)}>
            Delete
          </button>
          <hr />
          {this.state.displayForm ? (
            <InvestmentForm
              displayFormToggle={this.displayFormToggle}
              portfolioId={portfolio._id}
            />
          ) : null}
          {this.state.displayInvestments
            ? portfolio.investments.map((investment) => {
                return <div>{investment}</div>;
              })
            : null}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navigation />
        Protected Portfolio Page
        <br />
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
