import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';
import { connect } from 'react-redux';
import InvestmentForm from '../investments/InvestmentForm';
import Toggler from '../elements/Toggler';
import ReturnCalculator from '../elements/ReturnCalculator';
import RealTimePriceFetcher from '../elements/RealTimePriceFetcher';
import InvestmentReturnCollector from '../elements/InvestmentReturnCollector';

export class PortfolioInvestments extends Component {
  state = { investments: [], investmentProfits: {}, totalReturn: '' };

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

  calculateTotalReturn = () => {
    const { investmentProfits } = this.state;
    let sum = 0;
    for (const key in investmentProfits) {
      sum = sum + investmentProfits[key];
    }
    return sum;
  };

  updatePortfolioTotalReturn = (investmentId, amount) => {
    const updatedObject = this.state.investmentProfits;
    updatedObject[investmentId] = amount;
    this.setState({
      investmentProfits: updatedObject,
    });
    // I might want to add logic in here to make sure that investmentProfits is updated property before the total
    // return calculation can be run.
    const totalReturn = this.calculateTotalReturn();
    this.setState({
      totalReturn,
    });
  };

  renderPortfolioInvestments = () => {
    const investmentList = this.state.investments.map((investment) => {
      return (
        <Toggler
          defaultDisplay={true}
          key={investment._id}
          render={(toggle, on) => {
            return on ? (
              <div>
                <InvestmentForm
                  toggle={toggle}
                  investment={investment}
                  use={'update'}
                >
                  <RealTimePriceFetcher>
                    <ReturnCalculator>
                      <InvestmentReturnCollector
                        investmentId={investment._id}
                        updatePortfolioTotalReturn={
                          this.updatePortfolioTotalReturn
                        }
                      />
                    </ReturnCalculator>
                  </RealTimePriceFetcher>
                </InvestmentForm>
              </div>
            ) : null;
          }}
        />
      );
    });
    return investmentList;
  };

  render() {
    return (
      <>
        <div>Total Return : {this.state.totalReturn}</div>
        <div>
          {this.state.investments ? this.renderPortfolioInvestments() : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    authToken: AppState.auth.authToken,
  };
};

export default connect(mapStateToProps)(PortfolioInvestments);
