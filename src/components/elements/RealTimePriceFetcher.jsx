import React, { Component } from 'react';
import { httpRequest } from '../../utils/axios';

const ReturnTimeSeriesIntraDay = (keyword, api_key) => {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${keyword}&interval=5min&apikey=${api_key}`;
};

export class RealTimePriceFetcher extends Component {
  state = {
    realTimePrice: '',
  };

  fetchRealTimePrice = async (event) => {
    event.preventDefault();
    const { quote } = this.props;
    console.log('fetch real time clicked');
    if (quote) {
      const endPoint = ReturnTimeSeriesIntraDay(
        quote,
        process.env.REACT_APP_API_KEY
      );

      try {
        const { data } = await httpRequest.get(endPoint);

        const timePoint = Object.keys(data['Time Series (5min)'])[0];

        const closePrice = data['Time Series (5min)'][timePoint]['4. close'];

        this.setState({
          realTimePrice: closePrice,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const { realTimePrice } = this.state;
    return (
      <div>
        <p>Real Time Price: {realTimePrice}</p>
        <button onClick={this.fetchRealTimePrice}>
          Get the real time price
        </button>

        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            realTimePrice,
            entryPrice: this.props.entryPrice,
            quantity: this.props.quantity,
          });
        })}
      </div>
    );
  }
}

export default RealTimePriceFetcher;
