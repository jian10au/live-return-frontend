import React, { Component } from 'react';

export class InvestmentsPage extends Component {
  render() {
    return (
      <div>
        This is the investments page and this page is protected and user token
        is {this.props.userToken}
      </div>
    );
  }
}

export default InvestmentsPage;
