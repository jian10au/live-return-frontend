import React from 'react';
import { httpRequest } from '../../utils/axios';
import { fetchUserProfile } from '../../actions/userActions';

export const ReturnSearchEndPoint = (keywords, API_KEY) => {
  return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;
};

class AutoCompleteBox extends React.Component {
  state = {
    shares: [],
    isLoaded: false,
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    console.log('from did mount');
    if (this.props.quote) {
      const { quote } = this.props;
      try {
        const { data } = await httpRequest.get(
          ReturnSearchEndPoint(quote, process.env.REACT_APP_API_KEY)
        );

        console.log(data.bestMatches, 'what is best matches from didMount');
        console.log('setState from didmount will run');
        if (this._isMounted) {
          this.setState((prevState) => ({
            isLoaded: !prevState.isLoaded,
            shares: data.bestMatches,
          }));
        }
      } catch (err) {
        console.log('err out', err);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidUpdate(prevProps) {
    if (this.props.quote !== prevProps.quote) {
      const { quote } = this.props;

      try {
        const { data } = await httpRequest.get(
          ReturnSearchEndPoint(quote, process.env.REACT_APP_API_KEY)
        );

        console.log(data.bestMatches, 'what is best matches from didUpdate');
        console.log('setState from did Update will run');
        if (this._isMounted) {
          this.setState({ isLoaded: true, shares: data.bestMatches });
        }
      } catch (err) {
        console.log('err out', err);
      }
    }
  }

  renderList = () => {
    const { shares } = this.state;
    if (shares && shares.length >= 1) {
      const listOfShares = shares.map((share, index) => (
        <ul onClick={this.props.setQuoteInput} key={index}>
          {share['1. symbol']} {share[`2. name`]}
        </ul>
      ));
      return listOfShares;
    }
    return (
      <div>
        No Data either because API call limit is reached or AlphaVantage DB
        cannot find the quote. Please wait for one minute and try again.
      </div>
    );
  };

  render() {
    console.log(this.state.isLoaded, 'what is loading status for AutoComplete');
    const { isLoaded, shares } = this.state;
    return (
      <div>{isLoaded ? this.renderList() : <div>Wait for data input</div>}</div>
      // notice, here instead of saying this.state is empty or not
    );
  }
}

export default AutoCompleteBox;
