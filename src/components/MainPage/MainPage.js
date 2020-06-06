import React from 'react';
import { Typography } from '@material-ui/core';
// Assets
import singer1 from './assets/imgs/singer1.png';
import singer2 from './assets/imgs/singer2.png';
import singer3 from './assets/imgs/singer3.png';
import singer4 from './assets/imgs/singer4.png';
// Style
import './MainPage.css';


export default class MainPage extends React.Component {

  render() {
    return (
      <div id="main-page-wrapper">
        <div>
          <div>
            <Typography id="title" variant="h1"> Are you a musician? </Typography>
            <Typography id="title2" variant="h5"> Let your talent shine. Compete. Earn money.</Typography>
          </div>
          <div id="photos">
            <img src={singer1} alt=""></img>
            <img src={singer2} alt=""></img>
            <img src={singer3} alt=""></img>
            <img src={singer4} alt=""></img>
          </div>
          <div className="info">
            <Typography component="p" variant="subtitle1"><Typography component="span" variant="subtitle1" className="redText">36,845</Typography> rounders have been active today</Typography>
            <Typography component="p" variant="subtitle1"><Typography component="span" variant="subtitle1" className="redText">2,874</Typography> challenges completed</Typography>
            <Typography component="p" variant="subtitle1">Over <Typography component="span" variant="subtitle1" className="redText">$50,000</Typography> distributed in prizes</Typography>
          </div>
        </div>
      </div>);
  }
}