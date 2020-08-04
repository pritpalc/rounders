import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Input, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
// Services and utils
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
    const { uploadVideoResponse } = this.props;
    if (prevProps.uploadVideoResponse.status === STATUS.request && uploadVideoResponse.status !== STATUS.request) {
      if (uploadVideoResponse.status === STATUS.success) {
        // TODO - Submit challenge with the upload
      } else if (uploadVideoResponse.status === STATUS.failed) {
        window.alert(`Unable to upload your video. ${uploadVideoResponse.error}`);
      }
    }
  }

  render() {
    return (
      <Grid
        id="submit-challenge-wrapper"
        container
        justify="center"
        alignItems="center"
      >
        <div id="upload-video-form-wrapper">
          <div id="description-wrapper">
            <Typography
              variant="h5"
              color="primary"
            >
              Upload your challenge video
            </Typography>
            <Typography id="song-title">
              Song: {"Song goes here"}
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
    uploadVideoResponse: state.uploads.postUploads
  }
}

const mapDispatchToProps = {
  uploadVideo: uploadsActions.postUploads
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitChallenge));