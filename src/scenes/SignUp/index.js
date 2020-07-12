import React from 'react';
import { connect } from 'react-redux';
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

class SignUp extends React.Component {

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
    const signUpResponse = this.props.signUpResponse;
    if (prevProps.signUpResponse.requesting && !signUpResponse.requesting) {
      if (signUpResponse.failed) {
        this.setState({ errorMessage: "We are unable to sign you up at this moment, please try again later" });
      } else {
        this.setState({ successMessage: "Welcome to rounders!" });
      }
    }
  }

  render() {
    return (
      <div id="sign-up-wrapper">
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
                this.props.signup({ email, password });
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