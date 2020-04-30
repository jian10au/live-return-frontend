import React, { Component } from 'react';
import { httpRequest } from '../utils/axios';
import Navigation from '../components/Navigation';

export class InvestmentsPage extends Component {
  handleClick = async () => {
    const response = await httpRequest.get('/portfolios');
    console.log(response.data);
  };

  render() {
    return (
      <div>
        <Navigation />
        This is the investments page and this page is protected and user token
        is {this.props.userToken}
        <button onClick={this.handleClick}>Test another axios request</button>
      </div>
    );
  }
}

export default InvestmentsPage;
