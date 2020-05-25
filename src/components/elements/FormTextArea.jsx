import React, { Component } from 'react';

export class FormTextArea extends Component {
  render() {
    const {
      name,
      type,
      placeholder,
      id,
      required,
      onChange,
      displayName,
    } = this.props;
    return (
      <div>
        <label htmlFor={name}>{displayName}</label>
        <textarea
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default FormTextArea;
