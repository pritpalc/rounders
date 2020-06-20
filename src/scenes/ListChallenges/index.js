import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import './style.css';

class ListChallenges extends React.Component {

  renderLists = () => {
    const { challenges } = this.props.getChallenges;
    if (challenges) {
      return challenges.map((challenge, index) => {
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
    getChallenges: state.getChallenges
  }
}

export default connect(mapStateToProps, undefined)(ListChallenges);