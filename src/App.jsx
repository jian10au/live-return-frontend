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
    console.log('rendered from App component');
    // if (this.props.isloadingUser === false) {
    //   return <PageRouter />;
    // } else {
    //   return null;
    // }
    return this.props.isloadingUser === false ? <PageRouter /> : null;
  }
}

const mapStateToProps = (AppState) => {
  console.log(AppState, 'AppState from App Component');
  return { isloadingUser: AppState.auth.isLoading };
};

export default connect(mapStateToProps, { loadUser })(App);
