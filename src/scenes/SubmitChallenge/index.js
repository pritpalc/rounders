import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Input, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
// Components
import Loader from '../../components/Loader';
// Services and utils
import { challengeActions } from '../../services/challenges/actions';
import { uploadsActions } from '../../services/uploads/actions';
import { STATUS } from '../../services/utils/reducers';
// Style
import './style.css';



class SubmitChallenge extends React.Component {

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      error: ""
    }
  }

  componentDidUpdate(prevProps) {
    // Video upload
    const { uploadVideoResponse } = this.props;
    if (prevProps.uploadVideoResponse.status === STATUS.request && uploadVideoResponse.status !== STATUS.request) {
      if (uploadVideoResponse.status === STATUS.success) {
        const { challengeId, token } = this.props;
        const { data } = uploadVideoResponse;
        this.props.submitChallenge(challengeId, data.location, token);
      } else if (uploadVideoResponse.status === STATUS.failed) {
        window.alert(`Unable to upload your video. ${uploadVideoResponse.error}`);
      }
    }
    // Challenge submission
    const { submitChallengeResponse } = this.props;
    if (prevProps.submitChallengeResponse.status === STATUS.request && submitChallengeResponse.status !== STATUS.request) {
      if (submitChallengeResponse.status === STATUS.success) {
        this.props.onSuccess();
      } else if (submitChallengeResponse.status === STATUS.failed) {
        window.alert(`Unable to submit your challenge with the provided video. ${submitChallengeResponse.error}`);
      }
    }
  }

  render() {
    const { uploadVideoResponse } = this.props;
    return (
      <Grid
        id="submit-challenge-wrapper"
        container
        justify="center"
        alignItems="center"
        style={{ position: "relative" }}
      >
        {uploadVideoResponse.status === STATUS.request && <Loader />}
        <div id="upload-video-form-wrapper">
          <div id="description-wrapper">
            <Typography
              variant="h5"
              color="primary"
            >
              Upload your challenge video
            </Typography>
          </div>
          <form
            id="upload-video-form"
            onSubmit={e => { e.preventDefault() }}
          >
            <Typography
              htmlFor="choose-video-input"
              component="label"
            >
              Video
            </Typography>
            <Input
              id="choose-video-input"
              type="file"
              error={Boolean(this.state.error)}
              helperText={this.state.error}
              inputProps={{
                accept: "video/mp4,video/x-m4v,video/*",
                ref: this.fileInput
              }}
            />
            <Button
              id="upload-button"
              variant="contained"
              color="primary"
              type="submit"
              onClick={e => {
                const files = this.fileInput.current.files;
                const { token, uploadVideo } = this.props;
                if (files.length === 0) {
                  this.setState({ error: "Please select a video to upload" });
                  window.alert("Please select a video to upload");
                } else {
                  uploadVideo({ file: files[0], name: files[0].name }, token)
                }
              }}
            >
              Upload
            </Button>
          </form>
        </div>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token || "",
    uploadVideoResponse: state.uploads.postUploads,
    submitChallengeResponse: state.submitChallenge
  }
}

const mapDispatchToProps = {
  uploadVideo: uploadsActions.postUploads,
  submitChallenge: challengeActions.submitChallenge
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitChallenge));