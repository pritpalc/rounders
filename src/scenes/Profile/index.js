import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { constants } from '../../services/challenges/constants';
import { challengeActions } from '../../services/challenges/actions';
// Style
import './styles.css';

class Profile extends React.Component {

  getTotalChallenges = (challenges) => {
    return Object.keys(challenges).length
  }

  getTotalWins = (challenges) => {
    // TODO: Determine method to calculate wins
    return 1
  }

  getChallengeInfo = () => {
    const challenges = this.props.challenges
    // If user has no history of challenges do not display challenge data
    if (Object.keys(challenges).length > 0 && challenges.constructor === Object) {
      const completed = this.getTotalChallenges(challenges)
      const victories = 1
      const winRate = victories / completed * 100
      return (
        <div className="flex_center_space">
          <div className="stas">
            <Avatar className="stat-completed-summary-avatar">
              {completed}
            </Avatar>
            <h3>Challenges Completed</h3>
          </div>
          <div className="stas">
            <Avatar className="stat-victories-summary-avatar">
              {victories}
            </Avatar>
            <h3>Victories</h3>
          </div>
          <div className="stas">
            <Avatar className="stat-rate-summary-avatar">
              {winRate}%
            </Avatar>
            <h3>Win Rate</h3>
          </div>
        </div>
      );
    }
  }

  getProfileHeader = () => {
    console.log(this.props)
    const user = this.props.auth.user;
    return (
      <div id="profileHeader">
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
    );
  }


  getProfileInfo = () => {
    const user = this.props.auth.user;
    return (
      <div className="nav">
        <ul id="profile-info-list">
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
  return {
    auth: state.auth,
    challenges: state.getChallengesForUser
  }
}

const mapDispatchToProps = {
  getChallengesForUser: challengeActions.getChallengesForUser
}

export default connect(mapStateToProps, null)(Profile);