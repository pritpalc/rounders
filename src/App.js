import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
// Components
import AppBar from './components/AppBar';
// Scenes
import MainPage from './scenes/MainPage';
import CreateChallenge from './scenes/CreateChallenge';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp';
import ListChallenges from './scenes/ListChallenges';
import Challenges from './scenes/Challenges';
import ChallengeDetails from './scenes/ChallengeDetails';
import Profile from './scenes/Profile';
// Style
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6202EE",
    },
    secondary: {
      main: "#A32F69"
    }
  },
  typography: {
    h1: {
      fontSize: "4rem"
    },
    h2: {
      fontSize: "3.5rem"
    },
    h3: {
      fontSize: "3rem"
    },
    h4: {
      fontSize: "2.5rem"
    },
    h5: {
      fontSize: "2rem"
    },
    h6: {
      fontSize: "1.5rem"
    },
    subtitle1: {
      fontSize: "1.4rem"
    },
    button: {
      fontWeight: "600",
      letterSpacing: "2.83px",
      fontSize: "0.95rem",
      lineHeight: "1.7rem",
      textTransform: "uppercase"
    }
  },
  shape: {
    borderRadius: 8
  }
});

function App(props) {
  const { auth } = props;
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div id="app-wrapper">
          <AppBar />
          <main id="content-wrapper">
            <Switch>
              <Route exact match path="/login" component={Login} />
              <Route exact match path="/signup" component={SignUp} />
              <Route exact match path="/home" component={MainPage} />
              {!auth.token && <Redirect to="/home" />}
              <Route exact match path="/profile" component={Profile} />
              <Route exact match path="/challenge/create" component={CreateChallenge} />
              <Route exact match path="/challenges" component={Challenges} />
              <Route exact match path="/challenge/list" component={ListChallenges} />
              <Route path="/challengeDetails/:challengeId" component={ChallengeDetails} />
              <Redirect to="/home" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, null)(App);
