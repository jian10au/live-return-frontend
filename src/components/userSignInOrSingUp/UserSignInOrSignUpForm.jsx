import React, { Component } from 'react';
import FormInput from '../elements/FormInput';
import FormTextArea from '../elements/FormTextArea';

export class UserSignInOrSignUpForm extends Component {
  render() {
    const { onChange, onSignIn, onRegister, use } = this.props;
    return (
      <form>
        {use === 'register' ? (
          <FormInput
            name="username"
            type="text"
            placeholder="Your Username"
            required="required"
            displayName="Username"
            onChange={onChange}
          />
        ) : null}
        <FormInput
          name="email"
          type="text"
          placeholder="Your Email"
          required="required"
          displayName="Email"
          onChange={onChange}
        />
        <FormInput
          name="password"
          type="text"
          placeholder="Your Password"
          required="required"
          displayName="Password"
          onChange={onChange}
        />
        {use === 'register' ? (
          <button onClick={onRegister}>Register</button>
        ) : (
          <button onClick={onSignIn}>Sign In</button>
        )}
        <button>Clear</button>
      </form>
    );
  }
}

export default UserSignInOrSignUpForm;
