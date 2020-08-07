import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
// Components
import Loader from '../../components/Loader';
// Services and utils
import { challengeActions } from '../../services/challenges/actions';
import { STATUS } from '../../services/utils/reducers';
// Style
import './style.css';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    }
  }

  componentDidMount() {
    const { token } = this.props.auth;
    if (token !== undefined) {
      this.props.getChallenges(token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getChallengesResponse.status === STATUS.request && this.props.getChallengesResponse.status === STATUS.success) {
      this.setState({
        challenges: this.props.getChallengesResponse.data
      });
    }
  }

  renderLists = () => {
    const challenges = this.state.challenges
    // Check if there are any available challenges
    if (Object.keys(challenges).length > 0) {
      return challenges.map((challenge, index) => {
        const challengeId = challenge._id;
        const challengedAt = challenge.challengedAt;
        const challengedBy = challenge.challengedBy;
        const challengedTo = challenge.challengedTo;
        const acceptedAt = challenge.acceptedAt;
        const submissions = challenge.submissions;
        return (
          <Grid
            item
            xs={3}
            className="list-challenges-item"
            key={index}
          >
            <Link to={{ pathname: `/challengeDetails/${challengeId}`, state: { challenge: { challenge } } }} style={{ display: "flex", flexDirection: "row-reverse" }} >View Detail</Link>
            <Typography>
              {() => { if (submissions) { return "Submitted"; } else if (acceptedAt) { return "Accepted"; } }}
            </Typography>
            <Typography color="primary" style={{ paddingTop: 5 }}>
              {challengedBy.firstName} {challengedBy.lastName} have challenged {challengedTo.firstName} {challengedTo.lastName} with these songs options:
            </Typography>
            <ul className="track-options-list">
              {challenge.trackOptions.map(track => {
                return (
                  <li key={`${index}${track.trackName}`}>
                    <Typography>
                      {track.artistName} - {track.trackName}
                    </Typography>
                  </li>
                )
              })}
            </ul>
            <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "2-digit",
                year: "numeric"
              }).format(Date.parse(challengedAt))}
            </span>
          </Grid>
        );
      });
    } else {
      return (
        <Grid
          item
          xs={6}
          className="list-challenges-item"
        >
          <Typography
            variant="h6"
            align="center"
          >
            You have not created any challenges yet.
          </Typography>
        </Grid>
      );
    }
  };

  render() {
    const getChallengesResponse = this.props.getChallengesResponse;
    return (
      <div>
        <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center", paddingTop: "2rem" }}>Trending Challenges</Typography>
        <Grid
          container
          justify="center"
          alignContent="center"
          mt={-20}
          style={{
            height: "100%",
            width: "100%",
            position: "relative"// For loader to position itself
          }}
        >
          {getChallengesResponse.status === STATUS.request ?
            <Loader />
            :
            this.renderLists()
          }
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    getChallengesResponse: state.getChallenges
  }
}

const mapDispatchToProps = {
  getChallenges: challengeActions.getChallenges
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);