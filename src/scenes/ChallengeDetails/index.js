import React from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid
} from '@material-ui/core';
// Style
import './style.css';
import { connect } from 'react-redux';
import { challengeActions } from '../../services/challenges/actions';
import { STATUS } from '../../services/challenges/reducer';
import Loader from '../../components/Loader';

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {},
      successMessage: "",
      errorMessage: ""
    }
  }

  componentDidMount() {
    const { token } = this.props.auth;
    if (token !== undefined) {
      this.props.getChallenge(this.props.match.params.challengeId,token);
    }
  }

  renderChallenge = () => {
    const challenge = this.props.getChallengeResponse.data;
    const challengeId = challenge._id;
    const auth = this.props.auth;
    const userId = (auth.user && auth.user._id) || "";
    const challengedAt = challenge.challengedAt;
    const challengedBy = challenge.challengedBy;
    const challengedTo = challenge.challengedTo;
    const acceptedAt = challenge.acceptedAt;
    const submissions = challenge.submissions;
    const userCreatedChallenge = userId === challengedBy._id;
    const notAccepted = (challengedTo._id === userId) && !challenge.acceptedAt
    return ( 
    <Grid
      itemProp
      className="list-challenges-item"
      xs={12}
    >
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Typography color="primary" style={{paddingTop:5}}>
        {userCreatedChallenge ?
          `You have challenged ${challengedTo.firstName} ${challengedTo.lastName} with these songs options:`
          :
          `${challengedBy.firstName} ${challengedBy.lastName} has challenged you with these songs options:`
        }
      </Typography>
      <Typography color="primary">
        {new Intl.DateTimeFormat("en", {
          month: "long",
          day: "2-digit",
          year: "numeric"
        }).format(Date.parse(challengedAt))}
      </Typography>
      </div>
      <ul className="track-options-list">
        {challenge.trackOptions.map((track, index) => {
          return (
            <li key={`${track.trackName}`} style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
              <Typography>
                {track.artistName} - {track.trackName}
              </Typography>
              {notAccepted ?
              <Button 
                  size="small" 
                  color="primary"
                  onClick={(event) => { 
                      window.alert("Accepting challenge");
                      this.props.acceptChallenge(challengeId,index,auth);
                      this.forceUpdate()
                    }
                  }> 
                  Accept Challenge 
                </Button> : ""}
            </li>
          )
        })}
      </ul>
      <Typography> Status: {getStatus(challenge)} </Typography>
      <div >
        {submissions.length>0? <Typography>Submissions</Typography> : ""}
      </div>
    </Grid>
    );
};

  render() {
    return (
      this.props.getChallengeResponse.status == STATUS.success ? 
      <Grid
        container
        style={{
          height: "100%",
          width: "100%",
          position: "relative" // For loader to position itself
        }}
      >
        {this.renderChallenge()}
      </Grid> : <Loader />
    )
  }
}

function getStatus(challenge) {
  if (challenge.submissions.length>0) {
    return "Submitted";
  } else if (challenge.acceptedAt!=null) {
    return "Accepted";
  } else {
    return "Not Accepted";
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    getChallengeResponse: state.getChallenge,
    acceptChallenge: state.acceptChallenge
  }
}

const mapDispatchToProps = {
  getChallenge: challengeActions.getChallenge,
  acceptChallenge: challengeActions.acceptChallenge,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails);