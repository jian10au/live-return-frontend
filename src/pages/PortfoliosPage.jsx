import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function PortfoliosPage() {
  return (
    <div>
      <Navigation />
      Protected Portfolio Page
      <br />
      <Link to="/investments">To Investments Page</Link>
    </div>
  );
}

export default PortfoliosPage;