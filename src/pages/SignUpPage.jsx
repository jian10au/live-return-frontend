import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { httpRequest } from '../utils/axios';
import { Link, Redirect } from 'react-router-dom';
import UserSignInorSignUpFormContainer from '../components/userSignInOrSingUp/UserSignInOrSignUpFormContainer';
import UserSignInorSingUpForm from '../components/userSignInOrSingUp/UserSignInOrSignUpForm';

export class _SignUpPage extends Component {
  render() {
    console.log(this.state);
    return (
      <div>
        <UserSignInorSignUpFormContainer
          {...this.props}
          render={(onChange, onSignIn, onRegister) => (
            <UserSignInorSingUpForm
              onChange={onChange}
              onSignIn={onSignIn}
              onRegister={onRegister}
              use={'register'}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (AppState) => {
  console.log(AppState);
  return { errorPrompt: AppState.error, appState: AppState };
};

export const SignUpPage = connect(mapStateToProps, { register })(_SignUpPage);
