import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
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
                  to="/profile"
                  className="link"
                >
                  <Button className="button">
                    Profile
                  </Button>
                </Link>
                <Button
                  className="button"
                  onClick={() => { this.props.logout() }}
                >
                  Log Out
                </Button>
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