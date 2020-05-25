import React, { Component } from 'react';

export class FormInput extends Component {
  render() {
    const {
      name,
      type,
      placeholder,
      id,
      required,
      onChange,
      displayName,
      data,
      onFocus,
      onClick,
    } = this.props;
    return (
      <div>
        <label htmlFor={name}>{displayName}</label>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={data}
          onFocus={onFocus}
          onClick={onClick}
        />
      </div>
    );
  }
}

export default FormInput;
