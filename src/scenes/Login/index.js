import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Snackbar
} from '@material-ui/core';
// Utils and services
import { userActions } from '../../services/users/actions';
// Style
import './style.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      successMessage: "",
      errorMessage: ""
    }
  }

  componentDidUpdate(prevProps) {
    const auth = this.props.auth;
    if (prevProps.auth.requesting && !auth.requesting) {
      if (auth.failed) {
        this.setState({ errorMessage: "We are unable to log you in at this moment, please try again later" });
      } else {
        this.setState({ successMessage: "Yay! Taking you to your account..." });
      }
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <div id="login-wrapper">
        {auth.token && <Redirect to="/profile" />}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.errorMessage !== ""}
          onClose={() => { this.setState({ errorMessage: "" }) }}
          message={this.state.errorMessage}
          ContentProps={{
            classes: { root: "error-snackbar-content" }
          }}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.successMessage !== ""}
          onClose={() => { this.setState({ successMessage: "" }) }}
          message={this.state.successMessage}
          ContentProps={{
            classes: { root: "success-snackbar-content" }
          }}
        />
        <div id="login-text-and-form-wrapper">
          <Typography
            variant="h5"
            color="primary"
          >
            We're glad to have you back!
          </Typography>
          <form id="login-form">
            <TextField
              label="Your email"
              value={this.state.email}
              type="text"
              variant="outlined"
              onChange={event => { this.setState({ email: event.target.value }) }}
            />
            <TextField
              label="Your password"
              value={this.state.password}
              type="password"
              variant="outlined"
              onChange={event => { this.setState({ password: event.target.value }) }}
            />
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              size="large"
              onClick={event => {
                event.preventDefault();
                const email = this.state.email;
                const password = this.state.password;
                if (email === "" || password === "") {
                  this.setState({ errorMessage: "Please provide both your email and password" });
                } else {
                  this.props.login(this.state.email, this.state.password);
                }
              }}
              fullWidth
            >
              Login
          </Button>
          </form>
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
  login: userActions.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);