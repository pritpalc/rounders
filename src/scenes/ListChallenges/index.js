import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import './style.css';
import { challengeActions } from '../../services/challenges/actions';
import { STATUS } from '../../services/challenges/reducer';

class ListChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.props.getChallenges();

    this.state = {
      challenges: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.challenges.status === STATUS.request && this.props.challenges.status === STATUS.success) {
      this.setState({
        challenges: this.props.challenges.data.challenges
      });
    }
  }

  renderLists = () => {
    const challenges = this.state.challenges
    // Check if there are any available challenges
    if (Object.keys(challenges).length > 0) {
      return challenges.map((challenge, index) => {
        return (
          <Grid item
            xs={3}
            className="list-challenges-item"
            key={index}
          >
            <Typography
              variant="h6"
            >
              Challenge {index + 1} songs:
              </Typography>
            <ul>
              <li key={index + '-track1'}>{challenge.trackOptions[0].trackName}</li>
              <li key={index + '-track2'}>{challenge.trackOptions[1].trackName}</li>
            </ul>
            <Typography
              variant="h6"
            >
              Challenger:
              </Typography>
            <ul>
              <li key={index + 'name'}>{challenge.challengedBy.firstName} {challenge.challengedBy.lastName}</li>
            </ul>
          </Grid>
        );
      });
    } else {
      return (
        <Grid item
          xs={3}
          className="list-challenges-item"
        >
          <Typography
            variant="h6"
          >
            No Challenges Available
            </Typography>
        </Grid>
      );
    }
  };

  render() {
    return (
      <Grid container
        justify="center"
        alignContent="center"
        spacing={3}
      >
        {this.renderLists()}
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    challenges: state.getChallenges
  }
}

const mapDispatchToProps = {
  getChallenges: challengeActions.getChallenges
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChallenges);