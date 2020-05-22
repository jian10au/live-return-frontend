import React, { Component } from 'react';
import { httpRequest } from '../utils/axios';
import { Navigation } from '../components/Navigation';

export class InvestmentsPage extends Component {
  render() {
    return (
      <div>
        <Navigation />
        This is the investments page and this page is protected and user token
      </div>
    );
  }
}

export default InvestmentsPage;
