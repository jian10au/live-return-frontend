import React from 'react';

class InvestmentReturnCollector extends React.Component {
  componentDidUpdate(prevProps) {
    const { updatePortfolioTotalReturn, investmentId, profit } = this.props;
    if (this.props.profit !== prevProps.profit) {
      updatePortfolioTotalReturn(investmentId, profit);
    }
  }

  render() {
    return null;
  }
}

export default InvestmentReturnCollector;
