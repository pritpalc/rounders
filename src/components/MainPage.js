import React from 'react';
import NavBar from './NavBar';
import './MainPage.css';
import singer1 from '../imgs/singer1.png';
import singer2 from '../imgs/singer2.png';
import singer3 from '../imgs/singer3.png';
import singer4 from '../imgs/singer4.png';


export default class MainPage extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <div>
            <p id="title"> Are you a musician? </p>
            <p id="title2">Let your talent shine. Compete. Earn money.</p>
          </div>
          <div id="photos">
            <img src={singer1} alt=""></img>
            <img src={singer2} alt=""></img>
            <img src={singer3} alt=""></img>
            <img src={singer4} alt=""></img>
          </div>
          <div className="info">
            <p><span className="redText">36,845</span> rounders have been active today</p>
            <p><span className="redText">2,874</span> challenges completed</p>
            <p>Over <span className="redText">$50,000</span> distributed in prizes</p>
          </div>
        </div>
      </div>);
  }
}