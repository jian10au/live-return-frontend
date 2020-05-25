import React from 'react';
import { connect } from 'react-redux';
import PageRouter from './PageRouter';

import { loadUser } from './actions/authActions';

class App extends React.Component {
  componentDidMount() {
    console.log(process.env.REACT_APP_API_KEY);
    this.props.loadUser();
  }
  render() {
    return this.props.isloadingUser === false ? <PageRouter /> : null;
  }
}

const mapStateToProps = (AppState) => {
  return { isloadingUser: AppState.auth.isLoading };
};

export default connect(mapStateToProps, { loadUser })(App);
