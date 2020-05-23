import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, register } from '../../actions/authActions';
import { Link } from 'react-router-dom';

class UserSignInOrSignUpFormContainer extends Component {
  state = {
    email: '',
    password: '',
    username: '',
  };

  handleSignIn = async (event) => {
    event.preventDefault();
    await this.props.signIn(this.state);
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  handleRegister = async (event) => {
    event.preventDefault();
    console.log('Sign Up Click');
    await this.props.register(this.state);
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        {this.props.render(
          this.handleChange,
          this.handleSignIn,
          this.handleRegister
        )}
        {this.props.error.id === 'signin_fail' ||
        this.props.error.id === 'register_fail' ? (
          <div>{this.props.error.msg.msg}</div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  console.log(AppState, 'AppState from SignInPage');

  return {
    isAuthenticated: AppState.auth.isAuthenticated,
    error: AppState.error,
  };
};

export default connect(mapStateToProps, { signIn, register })(
  UserSignInOrSignUpFormContainer
);
