import React, { Component } from 'react';

export class RegistrationInput extends Component {
  render() {
    const { name, type, placeholder, id, required, onChange } = this.props;

    return (
      <div>
        return (
        <div>
          <label htmlFor={name}>{name}</label>
          <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
          />
        </div>
        );
      </div>
    );
  }
}

export default RegistrationInput;
