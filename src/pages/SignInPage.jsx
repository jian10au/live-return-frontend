import React, { Component } from 'react';
import UserSignInOrSignUpForm from '../components/userSignInOrSingUp/UserSignInOrSignUpForm';
import UserSignInOrSignUpFormContainer from '../components/userSignInOrSingUp/UserSignInOrSignUpFormContainer';
import { Link } from 'react-router-dom';

export class SignInPage extends Component {
  render() {
    console.log(this.state);
    return (
      <div>
        <UserSignInOrSignUpFormContainer
          {...this.props}
          render={(onChange, onSignIn, onRegister) => (
            <UserSignInOrSignUpForm
              onChange={onChange}
              onRegister={onRegister}
              onSignIn={onSignIn}
              onRegister={onRegister}
            />
          )}
        />
        <Link to="/signup">Need to sign Up?</Link>
      </div>
    );
  }
}

export default SignInPage;
