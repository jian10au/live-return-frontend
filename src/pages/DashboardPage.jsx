import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Link>Create New Portfolio</Link>
        <Link to="/portfolios">View All Portfolio</Link>
      </div>
    );
  }
}

export default DashboardPage;
