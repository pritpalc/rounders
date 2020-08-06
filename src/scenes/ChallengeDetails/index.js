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
import ReactPlayer from "react-player"
import voteIcon from './assets/voteIcon.png';

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {}
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
    const auth = this.props.auth;
    const userId = auth.user._id;
    const challengedAt = challenge.challengedAt;
    const challengedBy = challenge.challengedBy;
    const challengedTo = challenge.challengedTo;
    const userCreatedChallenge = userId == challengedBy._id;
    const submissions = challenge.submissions;
    const status = this.getStatus(challenge);

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
            <li key={`${track.trackName}`} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <Typography>
                {track.artistName} - {track.trackName}
              </Typography>
              {this.renderTrackOption(challenge, status, index)}
            </li>
          )
        })}
      </ul>
      <Typography color="primary"> Status: {status} </Typography>
      <div >
        {submissions.length>0? this.displaySubmissions(challenge) : ""}
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

  renderTrackOption = (challenge, status, index) => {
    if (status == "Submitted"){
      return ""
    } else if (status == "Accepted") {
      return (
      challenge.acceptedTrackIndex == index ? 
        <Button size="small" color="primary">Upload Video</Button> : "")
    } else {
      return (
        this.props.auth.user._id == challenge.challengedTo._id ? 
        <Button 
          size="small" 
          color="primary"
          onClick={(event) => { 
              window.alert("Accepting challenge");
              this.props.acceptChallenge(challenge._id,index,this.props.auth);
              window.location.reload(false);
            }
          }> 
          Accept Challenge 
        </Button> : ""
      )
    }
  }

  getStatus = (challenge) => {
      if (challenge.submissions.length>0) {
        return "Submitted";
      } else if (challenge.acceptedAt!=null) {
        return "Accepted";
      } else {
        return "Not Accepted";
      }
    }
      
  displaySubmissions = (challenge) => {
    console.log(challenge);
    let link1 = "";
    let link2 = "";
    if (challenge.submissions.length == 2) {
      if (challenge.submissions[0].author == challenge.challengeBy) {
        link1 = challenge.submissions[0].submissionUri;
        link2 = challenge.submissions[1].submissionUri;
      } else {
        link1 = challenge.submissions[1].submissionUri;
        link2 = challenge.submissions[0].submissionUri;
      }
    } else {
      if (challenge.submissions[0].author == challenge.challengeBy) 
        link1 = challenge.submissions[0].submissionUri;
      else 
        link2 = challenge.submissions[0].submissionUri;
    }
    return (
    <div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}> 
          <Typography color="primary" style={{alignSelf:"center", paddingTop:"1rem"}}>{`${challenge.challengedBy.firstName} ${challenge.challengedBy.lastName}'s Submission`}</Typography>
          <ReactPlayer url={link1} className="video"/>
          <img src={voteIcon} alt="" className="voteIcon" onClick={() => this.vote(challenge, "challenger")}></img>
          <Typography style={{alignSelf:"center"}}>23</Typography>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-center"}}> 
        <Typography color="primary" style={{alignSelf:"center", paddingTop:"1rem"}}>{`${challenge.challengedTo.firstName} ${challenge.challengedTo.lastName}'s Submission`}</Typography>
          <ReactPlayer url={link2} className="video"/>  
          <img src={voteIcon} alt="" className="voteIcon" onClick={() => this.vote(challenge, "challengee")}></img>
          <Typography style={{alignSelf:"center"}}>34</Typography>
        </div>
      </div>
    </div>)
  }
      
  vote = (challenge, role) => {
    console.log("calling", role);
    let voteFor = challenge.challengedBy._id;
    if (role == "challengee")
      voteFor = challenge.challengedTo._id;
    this.props.voteChallenge(challenge._id, voteFor, this.props.auth);
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    getChallengeResponse: state.getChallenge,
    acceptChallenge: state.acceptChallenge,
    voteChallenge: state.voteChallenge
  }
}

const mapDispatchToProps = {
  getChallenge: challengeActions.getChallenge,
  acceptChallenge: challengeActions.acceptChallenge,
  voteChallenge:challengeActions.voteChallenge
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails);