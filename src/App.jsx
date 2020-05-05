import React from 'react';
import { connect } from 'react-redux';
import PageRouter from './PageRouter';

import { loadUser } from './actions/authActions';

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
    console.log('load User gets called at all?');
  }
  render() {
    return <PageRouter />;
  }
}

export default connect(null, { loadUser })(App);
