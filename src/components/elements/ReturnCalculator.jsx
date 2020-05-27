import React, { Component } from 'react';

export class ReturnCalculator extends Component {
  state = {
    profit: '',
  };

  async componentDidUpdate(prevProps) {
    const { entryPrice, quantity, realTimePrice } = this.props;
    if (this.props.realTimePrice !== prevProps.realTimePrice) {
      const { realTimePrice } = this.props;

      const profitAmount = parseFloat(
        (parseFloat(realTimePrice) - parseFloat(entryPrice)) *
          parseInt(quantity).toFixed(2)
      );

      this.setState({ profit: profitAmount });
    }
  }

  render() {
    const { entryPrice, quantity, realTimePrice } = this.props;
    const { profit } = this.state;
    return (
      <div>
        {profit ? (
          <div>Profit {profit}</div>
        ) : (
          <div>Please fetch the real time price to see real time</div>
        )}
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            profit,
          });
        })}
      </div>
    );
  }
}

export default ReturnCalculator;
