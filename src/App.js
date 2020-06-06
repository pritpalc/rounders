import React from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
// Components
import CreateChallenge from './components/CreateChallenge';
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
      <div id="App">
        <CreateChallenge />
      </div>
    </ThemeProvider>
  );
}

export default App;
