import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <div>
        <button>
          <Link to="/dashboard">Back to dashboard</Link>
        </button>
      </div>
    );
  }
}

export default Navigation;
