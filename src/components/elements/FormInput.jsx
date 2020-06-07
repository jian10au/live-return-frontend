import React, { Component } from 'react';
import styles from '../elements/FormInput.module.css';

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
    console.log(data);
    return (
      <div>
        {type === 'checkbox' ? (
          <>
            <label htmlFor={name}>{displayName}</label>
            <input
              id={id}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              defaultChecked={data}
              onFocus={onFocus}
              onChange={onChange}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  }
}

export default FormInput;
