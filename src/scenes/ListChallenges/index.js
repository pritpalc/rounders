import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
// Components
import Loader from '../../components/Loader';
// Services and utils
import { challengeActions } from '../../services/challenges/actions';
import { STATUS } from '../../services/challenges/reducer';
// Style
import './style.css';

class ListChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    }
  }

  componentDidMount() {
    const { token } = this.props.auth;
    if (token !== undefined) {
      this.props.getMyChallenges(token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getMyChallengesResponse.status === STATUS.request && this.props.getMyChallengesResponse.status === STATUS.success) {
      this.setState({
        challenges: this.props.getMyChallengesResponse.data
      });
    }
  }

  renderLists = () => {
    const challenges = this.state.challenges
    // Check if there are any available challenges
    if (Object.keys(challenges).length > 0) {
      return challenges.map((challenge, index) => {
        const auth = this.props.auth;
        const userId = (auth.user && auth.user._id) || "";
        const challengedBy = challenge.challengedBy;
        const challengedTo = challenge.challengedTo;
        const userCreatedChallenge = userId === challengedBy._id;
        return (
          <Grid
            item
            xs={3}
            className="list-challenges-item"
            key={index}
          >
            <Typography color="primary">
              {userCreatedChallenge ?
                `You have challenged ${challengedTo.firstName} ${challengedTo.lastName} with these songs options:`
                :
                `${challengedBy.firstName} ${challengedBy.lastName} has challenged you with these songs options:`
              }
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
    const getMyChallengesResponse = this.props.getMyChallengesResponse;
    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        style={{
          height: "100%",
          width: "100%",
          position: "relative" // For loader to position itself
        }}
      >
        {getMyChallengesResponse.status === STATUS.request ?
          <Loader />
          :
          this.renderLists()
        }
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListChallenges);