import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import './style.css';

class AppBar extends React.Component {
  render() {
    return (
      <div id="app-bar">
        <Link to="/home" className="link-no-text-decoration">
          <span id="logo-text">rounders</span>
        </Link>
      </div>
    )
  }
}

export default AppBar;