import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MainPage from './scenes/MainPage';
import './App.css';

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: "#00"
  //   },
  //   secondary: {
  //     main: "#000"
  //   },
  //   error: {
  //     main: "#FFF"
  //   },
  //   action: {
  //     disabled: "#000",
  //     disabledBackground: "#FFF"
  //   }
  // },
  // typography: {
  //   fontFamily: "#"
  // }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage></MainPage>
    </ThemeProvider>
  );
}

export default App;
