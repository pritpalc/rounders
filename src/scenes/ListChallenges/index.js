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
    return this.state.challenges.map((challenge, index) => {
      return (
        <Grid item
          xs={3}
          className="list-challenges-item"
        >
          <Typography
            variant="h6"
          >
            Challenge {index + 1} songs:
            </Typography>
          <ul>
            <li>{challenge.songs[0]}</li>
            <li>{challenge.songs[1]}</li>
            <li>{challenge.songs[2]}</li>
          </ul>
        </Grid>
      );
    });
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