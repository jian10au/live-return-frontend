import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';
import { connect } from 'react-redux';
import InvestmentForm from '../investments/InvestmentForm';
import Toggler from '../elements/Toggler';
import ReturnCalculator from '../elements/ReturnCalculator';
import RealTimePriceFetcher from '../elements/RealTimePriceFetcher';
import InvestmentReturnCollector from '../elements/InvestmentReturnCollector';
import styles from './PortfolioInvestments.module.css';
import FormInput from '../elements/FormInput';
import InvestmentReturnAnalyser from './InvestmentReturnAnalyser';

export class PortfolioInvestments extends Component {
  state = {
    investments: [],
    investmentProfitsCollection: {},
    portfolioProfit: '',
    returnExcludeUnrealised: true,
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

  handleChangeCalculatorPreference = (event) => {
    this.setState((prevState) => {
      return { returnExcludeUnrealised: !prevState.returnExcludeUnrealised };
    });
  };

  deletePortfolioDisplayed = (event, id) => {
    event.preventDefault();
    console.log('state is reset?', id);
    const updatedInvestments = this.state.investments.filter((investment) => {
      return investment._id !== id;
    });
    console.log('what is updatedInvestments ?', updatedInvestments);
    this.setState({ investments: updatedInvestments });
  };

  calculatePortfolioTotalReturn = (event) => {
    //final piece is in here:
    event.preventDefault();
    const { returnExcludeUnrealised, investmentProfitsCollection } = this.state;

    let portfolioProfit;
    if (returnExcludeUnrealised) {
      console.log('within here?');
      let sumOfRealised = 0;
      for (let key in investmentProfitsCollection) {
        if (!investmentProfitsCollection[key][0]) {
          console.log(investmentProfitsCollection[key][1]);
          sumOfRealised =
            sumOfRealised + parseInt(investmentProfitsCollection[key][1]);
        }
      }
      portfolioProfit = sumOfRealised;
    } else {
      let sumOfAll = 0;
      for (let key in investmentProfitsCollection) {
        sumOfAll = sumOfAll + parseInt(investmentProfitsCollection[key][1]);
      }
      portfolioProfit = sumOfAll;
    }
    // more work to be done in here
    // console.log(portfolioProfit);

    // after get all the state; set the state and display it
    this.setState({ portfolioProfit: portfolioProfit });
  };

  updatePortfolioReturnCollection = (investmentId, amount, status) => {
    const profitData = [status, amount];

    this.setState((prevState) => {
      const updated = { ...prevState.investmentProfitsCollection };
      updated[investmentId] = profitData;

      return { investmentProfitsCollection: updated };
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
                  investmentId={investment._id}
                  toggle={toggle}
                  investment={investment}
                  use={'update'}
                  deletePortfolioDisplayed={this.deletePortfolioDisplayed}
                >
                  <RealTimePriceFetcher></RealTimePriceFetcher>
                  <InvestmentReturnAnalyser
                    investmentId={investment._id}
                    updatePortfolioReturnCollection={
                      this.updatePortfolioReturnCollection
                    }
                  />
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
        <div>Portfolio Return: {this.state.portfolioProfit}</div>
        <button
          onClick={this.calculatePortfolioTotalReturn}
          className={styles.calculatorBtn}
        >
          Calculate
        </button>
        <FormInput
          type={'toggle'}
          name={'returnCalculatorToggle'}
          id={this.props.portfolioId}
          className={styles.returnCalculatorToggle}
          onChange={this.handleChangeCalculatorPreference}
        />
        <div className={styles.wrapper}>
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
