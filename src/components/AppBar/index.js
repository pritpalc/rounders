import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// Services
import { userActions } from '../../services/users/actions';
// Styles
import './style.css';

class AppBar extends React.Component {
  render() {
    const { auth } = this.props;
    const userIsLoggedIn = auth.token !== undefined;
    return (
      <div id="app-bar">
        <Link
          to={userIsLoggedIn ? "/challenge/list" : "/home"}
          className="link-no-text-decoration"
        >
          <span id="logo-text">rounders</span>
        </Link>
        <div id="buttons-wrapper">
          {userIsLoggedIn &&
            (
              <React.Fragment>
                <Link
                  to="/challenge/create"
                  className="link"
                >
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                  >
                    New Challenge
                  </Button>
                </Link>
                <Link
                  to="/profile"
                  className="link"
                >
                  <IconButton
                    className="button icon"
                    variant="contained"
                    color="primary"
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Link>
                <IconButton
                  className="button icon"
                  onClick={() => { this.props.logout() }}
                  variant="contained"
                  color="primary"
                >
                  <ExitToAppIcon />
                </IconButton>
              </React.Fragment>
            )
          }
          {!userIsLoggedIn &&
            (
              <React.Fragment>
                <Link
                  to="/login"
                  className="link"
                >
                  <Button className="button">
                    Login
                </Button>
                </Link>
                <Link
                  to="/signup"
                  className="link"
                >
                  <Button className="button">
                    Sign Up
                </Button>
                </Link>
              </React.Fragment>
            )
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logout: userActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);