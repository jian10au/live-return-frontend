import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { connect } from 'react-redux';
import styles from './DashboardPage.module.css';
class DashboardPage extends Component {
  render() {
    return (
      <div className={styles.page}>
        <Navigation />
        <h1>Welcome {this.props.user.username}</h1>
        <br />
        <div className={styles.btnContainer}>
          <Link className={styles.linkBtn} to="/portfolio/new">
            Create New Portfolio
          </Link>
          <Link
            className={`${styles.linkBtn} ${styles.linkBtnAltColor}`}
            to="/user/portfolios"
          >
            View All My Portfolios
          </Link>
        </div>
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
