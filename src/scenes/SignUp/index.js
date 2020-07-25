import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Grid
} from '@material-ui/core';
// Utils and services
import { userActions } from '../../services/users/actions';
// Style
import './style.css';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      successMessage: "",
      errorMessage: "",
      redirectToLogin: false
    }
  }

  componentDidUpdate(prevProps) {
    const signUpResponse = this.props.signUpResponse;
    if (prevProps.signUpResponse.requesting && !signUpResponse.requesting) {
      if (signUpResponse.failed) {
        this.setState({ errorMessage: "We are unable to sign you up at this moment, please try again later" });
      } else {
        this.setState({ successMessage: "Welcome to rounders!" }, () => {
          setTimeout(() => {
            this.setState({ redirectToLogin: true });
          }, 1000);
        });
      }
    }
  }

  render() {
    return (
      <div id="sign-up-wrapper">
        {this.state.redirectToLogin && <Redirect to="/login" />}
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
        <Typography variant="h6" color="primary">Welcome to rounders!</Typography>
        <form id="signup-form">
          <Grid
            container
            justify="space-between"
          >
            <TextField
              label="First name"
              value={this.state.firstName}
              type="text"
              variant="outlined"
              onChange={event => { this.setState({ firstName: event.target.value }) }}
            />
            <TextField
              label="Last name"
              value={this.state.lastName}
              type="text"
              variant="outlined"
              onChange={event => { this.setState({ lastName: event.target.value }) }}
            />
          </Grid>
          <TextField
            label="Email"
            value={this.state.email}
            type="text"
            variant="outlined"
            onChange={event => { this.setState({ email: event.target.value }) }}
          />
          <TextField
            label="Username"
            value={this.state.username}
            type="text"
            variant="outlined"
            onChange={event => { this.setState({ username: event.target.value }) }}
          />
          <TextField
            label="Password"
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
              const { firstName, lastName, email, username, password } = this.state;
              if (!firstName || !lastName || !email || !email || !username || !password) {
                this.setState({ errorMessage: "All fields are required" });
              } else {
                this.props.signup({ firstName, lastName, email, username, password });
              }
            }}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    signUpResponse: state.signup
  }
}

const mapDispatchToProps = {
  signup: userActions.signup
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);