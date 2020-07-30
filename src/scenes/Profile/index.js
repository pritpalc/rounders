import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Avatar, ListItem, Divider } from '@material-ui/core';
// Reusable components
import Loader from '../../components/Loader';
// Services and utils
import { challengeActions } from '../../services/challenges/actions';
import { STATUS } from '../../services/challenges/reducer';
// Style
import './styles.css';

class Profile extends React.Component {

  componentDidMount() {
    this.props.getMyChallenges(this.props.auth.token);
  }

  getTotalChallenges = (challenges) => {
    return Object.keys(challenges).length
  }

  getTotalWins = (challenges) => {
    // TODO: Determine method to calculate wins
    return 1
  }

  getChallengeInfo = () => {
    const getMyChallengesResponse = this.props.getMyChallengesResponse;
    const challenges = getMyChallengesResponse.data;
    const loading = getMyChallengesResponse.status === STATUS.request;
    // If user has no history of challenges do not display challenge data
    let totalChallenges = 0, victories = 0, winRate = 0;
    if (challenges && challenges.length > 0) {
      totalChallenges = challenges.length;
      victories = 1;
      winRate = parseFloat(victories / totalChallenges * 100).toFixed(0);
    }
    return (
      <div className="flex_center_space">
        <div className="stas">
          <Avatar className="stat-completed-summary-avatar">
            {loading ? "..." : totalChallenges}
          </Avatar>
          <h3>Total Challenges</h3>
        </div>
        <div className="stas">
          <Avatar className="stat-victories-summary-avatar">
            {loading ? "..." : victories}
          </Avatar>
          <h3>Victories</h3>
        </div>
        <div className="stas">
          <Avatar className="stat-rate-summary-avatar">
            {loading ? "..." : `${winRate}%`}
          </Avatar>
          <h3>Win Rate</h3>
        </div>
      </div>
    );
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
    const { getMyChallengesResponse } = this.props;
    return (
      <div
        id="profile-wrapper"
        style={{
          position: "relative" // For loader to position itself
        }}
      >
        {getMyChallengesResponse.status === STATUS.request && <Loader />}
        {this.getProfileHeader()}
        <Avatar className="stat-summary-avatar">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </Avatar>
        {this.getChallengeInfo()}
        {this.getProfileInfo()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    getMyChallengesResponse: state.getMyChallenges
  }
}

const mapDispatchToProps = {
  getMyChallenges: challengeActions.getMyChallenges
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);