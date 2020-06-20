import React from 'react';
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
import CreateChallenge from './components/CreateChallenge';
import AppBar from './components/AppBar';
import Footer from './components/Footer/Footer';
// Style
import './App.css';
import MainPage from './components/MainPage/MainPage';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div id="app-wrapper">
          <AppBar />
          <Switch>
            <Route exact match path="/home" component={MainPage} />
            <Route exact match path="/challenge/create" component={CreateChallenge} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
