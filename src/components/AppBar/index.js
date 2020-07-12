import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
// Styles
import './style.css';

class AppBar extends React.Component {
  render() {
    return (
      <div id="app-bar">
        <Link to="/home" className="link-no-text-decoration">
          <span id="logo-text">rounders</span>
        </Link>
        <div id="buttons-wrapper">
          <Link to="/profile">
            <Button id="login-button" className="button">
              Profile
            </Button>
          </Link>
          <Link to="/login">
            <Button id="login-button" className="button">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button id="sign-up-button" className="button">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default AppBar;