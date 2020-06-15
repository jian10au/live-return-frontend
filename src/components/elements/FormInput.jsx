import React, { Component } from 'react';
import styles from '../elements/FormInput.module.css';

export class FormInput extends Component {
  render() {
    const {
      className,
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
    if (type === 'checkedbox') {
      return (
        <div className={className}>
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
        </div>
      );
    }

    if (type === 'toggle') {
      return (
        <div className={className}>
          {/* <p>Status Toggle</p> */}
          <input
            id={id}
            type="checkbox"
            name={name}
            placeholder={placeholder}
            required={required}
            defaultChecked={data}
            onFocus={onFocus}
            onChange={onChange}
          />
          <label htmlFor={id}>{displayName}</label>
        </div>
      );
    } else {
      return (
        <div className={className}>
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
}

export default FormInput;
