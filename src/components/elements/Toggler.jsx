import React, { Component } from 'react';

export class Toggler extends Component {
  state = {
    display: this.props.defaultDisplay,
  };

  toggle = (event) => {
    event.preventDefault();
    console.log('toggle triggered?');
    this.setState((prevState) => ({
      display: !prevState.display,
    }));
  };

  render() {
    const { display: on } = this.state;
    return this.props.render(this.toggle, on);
  }
}

export default Toggler;
