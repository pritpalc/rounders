import React from 'react';
import './Footer.css';
import { SocialIcon } from 'react-social-icons';

export default class Footer extends React.Component {
  
  render() {
    return (
    <div id="footer" className="span_spaceinbetween">
      <div id="footer_caption">About Us | Contact Us
      </div>
      <div>
        <SocialIcon network="facebook" className="social_icon" style={{ height: 48, width: 48 }}/>
        <SocialIcon network="twitter" className="social_icon" style={{ height: 48, width: 48 }}/>
        <SocialIcon network="instagram" className="social_icon" style={{ height: 48, width: 48 }}/>
        <SocialIcon network="youtube" className="social_icon" style={{ height: 48, width: 48 }}/>
        <SocialIcon network="spotify" className="social_icon" style={{ height: 48, width: 48 }}/>
      </div>
    </div>);
  }
}