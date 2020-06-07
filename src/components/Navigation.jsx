import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/authActions';
import styles from './Navigation.module.css';
class _Navigation extends Component {
  handleClick = () => {
    this.props.signOut();
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.itemsContainer}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/user/portfolios">Portfolios</Link>
          <Link to="/investments">Investments</Link>
          <button onClick={this.handleClick}>　> Sign Out </button>
        </div>
      </div>
    );
  }
}

export const Navigation = connect(null, { signOut })(_Navigation);
