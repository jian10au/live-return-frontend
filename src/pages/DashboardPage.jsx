import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { connect } from 'react-redux';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div>Welcome {this.props.user.username}</div>
        <br />
        <Link to="/portfolio/new">Create New Portfolio</Link>
        <br />
        <Link to="/user/portfolios">View All My Portfolios</Link>
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  return {
    user: AppState.auth.user,
  };
};

export default connect(mapStateToProps)(DashboardPage);
