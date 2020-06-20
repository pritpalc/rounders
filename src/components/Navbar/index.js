import React from 'react';
import './style.css';

class Navbar extends React.Component {

  render() {
    return (
      <div id="background" className="span_spaceinbetween">
        <span id="icon">rounders</span>
        <span className="span_spaceinbetween">
          <button class="btn">LOG IN</button>
          <button class="btn">SIGN UP</button>
        </span>
      </div>
    );
  }
}

export default Navbar;