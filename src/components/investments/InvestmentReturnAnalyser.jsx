import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';

const ReturnTimeSeriesIntraDay = (keyword, api_key) => {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${keyword}&interval=5min&apikey=${api_key}`;
};

export class InvestmentReturnAnalyser extends Component {
  state = {
    profit: '',
    realTimePrice: '',
    display: false,
  };

  calculateInvestmentReturn = async () => {
    const {
      isActive,
      entryPrice,
      exitPrice,
      quantity,
      quote,
      updatePortfolioReturnCollection,
      investmentId,
    } = this.props;
    let profit;
    console.log('calculation triggered?');
    if (!isActive) {
      if (!exitPrice) {
        profit = quantity * (0 - entryPrice);
      } else {
        profit = quantity * (exitPrice - entryPrice);
      }
      this.setState({ profit }, () => {
        // console.log(this.state.profit, 'profit after the state is set');
        updatePortfolioReturnCollection(
          investmentId,
          this.state.profit,
          isActive
        );
      });
    } else {
      // get the real time return
      // profit = quantity * (realTimePrice - entryPrice)

      const endPoint = ReturnTimeSeriesIntraDay(
        quote,
        process.env.REACT_APP_API_KEY
      );

      try {
        const { data } = await httpRequest.get(endPoint);

        const timePoint = Object.keys(data['Time Series (5min)'])[0];

        const closePrice = data['Time Series (5min)'][timePoint]['4. close'];

        profit = quantity * (closePrice - entryPrice);
        this.setState({ profit }, () => {
          updatePortfolioReturnCollection(
            investmentId,
            this.state.profit,
            isActive
          );
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    this.calculateInvestmentReturn();
    this.setState({
      display: true,
    });

    //update the collector's data;

    // do a few things

    //will fetch real time price if the investment is in active status;
    //will get the exit price if the investment is sold;

    // then will calculate the total return

    // the return function will have conditional calculate logic;
    // if the investment is active profit = amount * (rt price - entry price)
    // if the investment is inactive profit = amount * (exit price - entry price)
  };

  render() {
    const { profit, display } = this.state;
    return (
      <div>
        Investment analyser
        <br></br>
        <button onClick={this.handleClick}>Display investment return</button>
        {display ? (
          <div>profit: {profit} - will be filled with real data</div>
        ) : (
          <div>
            {' '}
            profit: get the real time price first and click button to display
            profit
          </div>
        )}
      </div>
    );
  }
}

export default InvestmentReturnAnalyser;
