import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/authActions';

class _Navigation extends Component {
  handleClick = () => {
    this.props.signOut();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Sign Out</button>
        <br />
        <Link to="/dashboard">Dashboard</Link>
        <br />
        <Link to="/portfolios">Portfolios</Link>
        <br />
        <Link to="/investments">Investments</Link>
      </div>
    );
  }
}

export const Navigation = connect(null, { signOut })(_Navigation);
