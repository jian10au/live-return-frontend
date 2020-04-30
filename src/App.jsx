import React from 'react';
import AppRouter from './AppRouter';
import { fetchUserProfile } from './actions/userActions';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUserProfile();
  }
  render() {
    return <AppRouter />;
  }
}

export default connect(null, { fetchUserProfile })(App);
