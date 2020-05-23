import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import InvestmentForm from '../components/investments/InvestmentForm';
import PortfolioInvestments from '../components/investments/PortfolioInvestments';

import { httpRequest } from '../utils/axios';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';
import Toggler from '../components/elements/Toggler';

class PortfoliosPage extends React.Component {
  state = {
    portfolios: null,
    displayForm: false,
    displayInvestments: false,
    dispPortIdCreate: null,
    dispPortIdShow: null,
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

  displayFormToggle = (id) => {
    console.log(this.state.dispPortIdCreate, 'what is the displayId');
    this.state.dispPortIdCreate
      ? this.setState({
          displayForm: !this.state.displayForm,
          dispPortIdCreate: null,
        })
      : this.setState({
          displayForm: !this.state.displayForm,
          dispPortIdCreate: id,
        });
  };

  displayInvestmentsToggle = (id) => {
    this.state.dispPortIdShow
      ? this.setState({
          displayInvestments: !this.state.displayInvestments,
          dispPortIdShow: null,
        })
      : this.setState({
          displayInvestments: !this.state.displayInvestments,
          dispPortIdShow: id,
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

          <Toggler
            defaultDisplay={false}
            render={(toggle, on) => (
              <div>
                <button onClick={toggle}>Add Investment</button>
                {on ? (
                  <InvestmentForm portfolioId={portfolio._id} toggle={toggle} />
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

          <button onClick={() => this.handleDelete(portfolio._id)}>
            Delete
          </button>
        </div>
      );
    });
  }

  render() {
    console.log(this.state);
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
