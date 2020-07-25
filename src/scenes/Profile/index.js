import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// Style
import './styles.css';

class Profile extends React.Component {

  getProfileHeader = () => {
    const user = this.props.auth.user;
    return (
      <div id="profileHeader">
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
    );
  }

  getChallengeInfo = () => {
    return (
      <div className="flex_center_space">
        <div className="stas">
          <Avatar className="stat-summary-avatar">
            TODO
          </Avatar>
          <h3>Challenges Completed</h3>
        </div>
        <div className="stas">
          <Avatar className="stat-summary-avatar">
            TODO
          </Avatar>
          <h3>Victories</h3>
        </div>
        <div className="stas">
          <Avatar className="stat-summary-avatar">
            TODO
          </Avatar>
          <h3>Win Rate</h3>
        </div>
      </div>
    );
  }

  getProfileInfo = () => {
    const user = this.props.auth.user;
    return (
      <div class="nav">
        <ul>
          <ListItem>
            <p id="subheading">
              Name:
          </p> <p>{user.firstName} {user.lastName}</p></ListItem>
          <Divider />
          <ListItem><p id="subheading">Email: </p><p>{user.email}</p></ListItem>
          <Divider />
          <ListItem><p id="subheading">Joined: </p><p>{moment(user.createdAt).format("MMM DD, YYYY")}</p></ListItem>
          <Divider />
          <ListItem><p id="subheading">Bio: </p><p>{user.bio || "No bio yet."}</p></ListItem>
        </ul>
      </div>
    );
  }


  render() {
    const user = this.props.auth.user;
    return (
      <div id="profile-wrapper">
        {this.getProfileHeader()}
        <Avatar className="stat-summary-avatar">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </Avatar>
        {/* {this.getChallengeInfo()} */}
        {this.getProfileInfo()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, null)(Profile);