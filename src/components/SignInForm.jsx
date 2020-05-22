import React, { Component } from 'react';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';

export class SignInForm extends Component {
  render() {
    return (
      <form>
        <FormInput
          name="email"
          type="text"
          placeholder="email"
          required="required"
        />
        <FormInput
          name="password"
          type="text"
          placeholder="password"
          required="required"
        />
      </form>
    );
  }
}

export default SignInForm;
