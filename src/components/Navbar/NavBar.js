import React from 'react';
import './NavBar.css';

export default class NavBar extends React.Component {
  
  render() {
    return (
    <div id="background" className="span_spaceinbetween">
      <span id="icon"> rounder </span>
        <span className="span_spaceinbetween">
          <button class= "btn"> LOG IN </button>
          <button class= "btn"> SIGN UP </button>
        </span>
    </div>);
  }
}