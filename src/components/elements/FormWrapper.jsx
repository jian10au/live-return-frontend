import React, {
  Component,
  Children,
  isValidElement,
  cloneElement,
} from 'react';

export class FormWrapper extends Component {
  handleFormIputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const childrenWithProps = Children.map(this.props.children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, { onChange: this.handleFormIputChange });
      }
      return child;
    });
    return <div>{childrenWithProps}</div>;
  }
}

export default FormWrapper;
