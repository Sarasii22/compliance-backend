import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <ul role="menubar">
        <li role="menuitem"><Link to="/">Home</Link></li>
        <li role="menuitem"><Link to="/features">Features</Link></li>
        <li role="menuitem"><Link to="/demo">Live Demo</Link></li>
        <li role="menuitem"><Link to="/use-cases">Use Cases</Link></li>
        <li role="menuitem"><Link to="/pricing">Pricing</Link></li>
        <li role="menuitem"><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;