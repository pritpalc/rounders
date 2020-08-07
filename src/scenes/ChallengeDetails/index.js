import React from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  Button,
  Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// Components
import Loader from '../../components/Loader';
import SubmitChallenge from '../SubmitChallenge';
// Assets
import voteIcon from './assets/voteIcon.png';
// Services and utils
import { challengeActions } from '../../services/challenges/actions';
import { STATUS } from '../../services/utils/reducers';
// Style
import './style.css';

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {},
      uploadingVideo: false
    }
  }

  componentDidMount() {
    const { token } = this.props.auth;
    if (token !== undefined) {
      this.props.getChallenge(this.props.match.params.challengeId, token);
    }
  }

  componentDidUpdate(prevProps) {
    // Vote for a submission
    const { token, match, voteChallengeResponse } = this.props;
    if (prevProps.voteChallengeResponse.status === STATUS.request && voteChallengeResponse.status !== STATUS.request) {
      if (voteChallengeResponse.status === STATUS.success) {
        this.props.getChallenge(match.params.challengeId, token);
      } else if (voteChallengeResponse.status === STATUS.failed) {
        window.alert(`Unable to vote for this video. ${voteChallengeResponse.error}`);
      }
    }
  }

  renderChallenge = () => {
    const challenge = this.props.getChallengeResponse.data;
    const auth = this.props.auth;
    const userId = auth.user._id;
    const challengedAt = challenge.challengedAt;
    const challengedBy = challenge.challengedBy;
    const challengedTo = challenge.challengedTo;
    const userCreatedChallenge = userId === challengedBy._id;
    const submissions = challenge.submissions;
    const status = this.getStatus(challenge);

    return (
      <Grid
        itemProp
        className="list-challenges-item"
        xs={12}
      >
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color="primary" variant="h5" style={{ fontWeight: "bold" }}>
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
              <li key={`${track.trackName}`} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  {track.artistName} - {track.trackName}
                </Typography>
                {this.renderTrackOption(challenge, status, index)}
              </li>
            )
          })}
        </ul>
        <Typography color="primary"> Status: {status} </Typography>
        {this.state.uploadingVideo && (
          <SubmitChallenge
            challengeId={this.props.match.params.challengeId}
            onSuccess={() => {
              this.setState({ uploadingVideo: false }, () => {
                const { token } = this.props.auth;
                if (token !== undefined) {
                  this.props.getChallenge(this.props.match.params.challengeId, token);
                }
              })
            }}
          />
        )}
        <div>
          {submissions.length > 0 ? this.displaySubmissions(challenge) : ""}
        </div>
        <Link to="/challenge/list" className="link-no-text-decoration">
          <Button size="small" variant="outlined" color="primary">Go Back</Button>
        </Link>
      </Grid>
    );
  };

  render() {
    const { voteChallengeResponse } = this.props;
    return (
      this.props.getChallengeResponse.status === STATUS.success ?
        <Grid
          container
          style={{
            height: "100%",
            width: "100%",
            position: "relative" // For loader to position itself
          }}
        >
          {voteChallengeResponse.status === STATUS.request && <Loader />}
          {this.renderChallenge()}
        </Grid> : <Loader />
    )
  }

  renderTrackOption = (challenge, status, index) => {
    if (this.props.auth.user._id !== challenge.challengedBy._id && this.props.auth.user._id !== challenge.challengedTo._id)
      return "";
    if (status === "Submitted") {
      return (challenge.acceptedTrackIndex === index ?
        <Button size="small" color="primary">Submitted</Button> : "");
    } else if (status === "Accepted") {
      return (
        challenge.acceptedTrackIndex === index ?
          <Button
            size="small"
            color="primary"
            onClick={(e) => { this.setState({ uploadingVideo: true }) }}
          >
            Upload Video
          </Button>
          :
          ""
      )
    } else {
      return (
        this.props.auth.user._id === challenge.challengedTo._id ?
          <Button
            size="small"
            color="primary"
            onClick={(event) => {
              window.alert("Accepting challenge");
              this.props.acceptChallenge(challenge._id, index, this.props.auth);
              // window.location.reload(false); This statement was cancelling the acceptChallenge request above so I've commented it out
            }
            }>
            Accept Challenge
        </Button> : ""
      )
    }
  }

  getStatus = (challenge) => {
    const { submissions } = challenge;
    const { _id } = this.props.auth.user;
    const userSubmission = submissions.filter(s => s.author === _id);
    if (userSubmission.length > 0) {
      return "Submitted";
    } else if (challenge.acceptedAt !== null) {
      return "Accepted";
    } else {
      return "Not Accepted";
    }
  }

  displaySubmissions = (challenge) => {
    let link1 = "";
    let link2 = "";
    if (challenge.submissions.length === 2) {
      if (challenge.submissions[0].author === challenge.challengeBy) {
        link1 = challenge.submissions[0].submissionUri;
        link2 = challenge.submissions[1].submissionUri;
      } else {
        link1 = challenge.submissions[1].submissionUri;
        link2 = challenge.submissions[0].submissionUri;
      }
    } else {
      if (challenge.submissions[0].author === challenge.challengeBy)
        link1 = challenge.submissions[0].submissionUri;
      else
        link2 = challenge.submissions[0].submissionUri;
    }
    let challengedByVotes = challenge.votes ? challenge.votes.filter(v => v.for === challenge.challengedBy._id).length : 0;
    let challengedToVotes = challenge.votes ? challenge.votes.filter(v => v.for === challenge.challengedTo._id).length : 0;

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <Typography color="primary" style={{ alignSelf: "center", paddingTop: "1rem" }}>{`${challenge.challengedBy.firstName} ${challenge.challengedBy.lastName}'s Submission`}</Typography>
            <video
              className="video"
              src={link1}
              controls
            >
              <p>Your browser doesn't support HTML5 video. Here is a <a href={link1}>link to the video</a> instead.</p>
            </video>
            <Button><img src={voteIcon} alt="" className="voteIcon" onClick={() => this.vote(challenge, "challenger")}></img></Button>
            <Typography style={{ alignSelf: "center" }}>{challengedByVotes}</Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-center" }}>
            <Typography color="primary" style={{ alignSelf: "center", paddingTop: "1rem" }}>{`${challenge.challengedTo.firstName} ${challenge.challengedTo.lastName}'s Submission`}</Typography>
            <video
              className="video"
              src={link2}
              controls
            >
              <p>Your browser doesn't support HTML5 video. Here is a <a href={link2}>link to the video</a> instead.</p>
            </video>
            <Button><img src={voteIcon} alt="" className="voteIcon" onClick={() => this.vote(challenge, "challengee")}></img></Button>
            <Typography style={{ alignSelf: "center" }}>{challengedToVotes}</Typography>
          </div>
        </div>
      </div>)
  }

  vote = (challenge, role) => {
    console.log("calling", role);
    let voteFor = challenge.challengedBy._id;
    if (role === "challengee")
      voteFor = challenge.challengedTo._id;
    this.props.voteChallenge(challenge._id, voteFor, this.props.auth);
    // window.location.reload(false); This statement was cancelling the voteChallenge request above so I've commented it out
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    getChallengeResponse: state.getChallenge,
    acceptChallenge: state.acceptChallenge,
    voteChallengeResponse: state.voteChallenge
  }
}

const mapDispatchToProps = {
  getChallenge: challengeActions.getChallenge,
  acceptChallenge: challengeActions.acceptChallenge,
  voteChallenge: challengeActions.voteChallenge
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails);