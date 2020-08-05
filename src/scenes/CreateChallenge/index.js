import React from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core';
// Style
import './style.css';
import { connect } from 'react-redux';
import { challengeActions } from '../../services/challenges/actions';
import { userActions } from '../../services/users/actions';

const LastFM = require('last-fm')
const LAST_FM_API_KEY = process.env.REACT_APP_LAST_FM_API_KEY;
const lastfm = new LastFM(LAST_FM_API_KEY, { userAgent: 'MyApp/1.0.0 (http://localhost:3000/)' })

const FAKE_SONG_LIST = [
  "Beyonce - Formation",
  "Megan Thee Stallion - Savage",
  "Doja Cat - Like That",
  "Billie Eillish - ilomilo",
  "Cauty - Ta To Gucci",
  "Rihanna -Umbrella",
  "Clint Mansell - Lux Aeterna"
];

class CreateChallenge extends React.Component {

  constructor() {
    super();
    this.state = {
      songInput: "",
      userInput: "",
      userInputError: "",
      songInputError: "",
      songOptions: FAKE_SONG_LIST,
      userOptions: [],
      userChosen: "",
      songsChosen: [],
      songMenuIsVisible: false,
      userMenuIsVisible: false
    }
  }

  componentDidUpdate(prevProps, prevInput) {
    // Update songs
    if (prevInput.songInput !== this.state.songInput && this.state.songInput !== '') {
      let songOptions = [];
      lastfm.search({ q: `${this.state.songInput}` }, (err, data) => {
        // Add Fake Data if non 200 response
        if (err) {
          // console.error(err)
          for (var s in FAKE_SONG_LIST) {
            songOptions.push(FAKE_SONG_LIST[s]);
          }
          this.setState({ songOptions });
        }
        else {
          for (var d in data.result.tracks) {
            songOptions.push(data.result.tracks[d].artistName + ' - ' + data.result.tracks[d].name);
          }
          this.setState({ songOptions });
        }
      })
    }

    // Update users
    if (prevInput.userInput !== this.state.userInput && this.state.userInput !== '') {
      let userOptions = [];
      const users = this.props.searchUser(this.state.userInput)
      for (var u in users) {
        userOptions.push(users[u].username );
      }
      userOptions.push("rogerrabbit")
      this.setState({ userOptions });
    }
  }

  getSongOptions = () => {
    if (this.state.songOptions.length === 0) {
      return (
        <MenuItem
          color="primary"
          disabled
        >
          0 song matches
        </MenuItem>
      )
    }
    return (
      this.state.songOptions.map(s => {
        const chosen = this.state.songsChosen.includes(s);
        return (
          <MenuItem
            value={s}
            key={s}
            color="primary"
            disabled={chosen}
            onClick={(event) => {
              this.setState((state) => {
                return {
                  songsChosen: state.songsChosen.concat(s),
                  songMenuIsVisible: state.songsChosen.length === 2 ? false : state.songMenuIsVisible,
                  songInput: state.songsChosen.length === 2 ? "" : state.songInput,
                  songInputError: ""
                }
              });
            }}
          >
            {`${s}${chosen ? " (chosen)" : ""}`}
          </MenuItem>
        )
      })
    )
  }

  getUserOptions = () => {
    if (this.state.userOptions.length === 0) {
      return (
        <MenuItem
          color="primary"
          disabled
        >
          0 user matches
        </MenuItem>
      )
    }
    return (
      this.state.userOptions.map(s => {
        const chosen = this.state.userChosen.includes(s);
        return (
          <MenuItem
            value={s}
            key={s}
            color="primary"
            disabled={chosen}
            onClick={(event) => {
              this.setState((state) => {
                return {
                  userChosen: state.userChosen.concat(s),
                  userMenuIsVisible: state.userChosen.length === 1 ? false : state.userMenuIsVisible,
                  userInput: state.userChosen.length === 2 ? "" : state.userInput,
                  userInputError: ""
                }
              });
            }}
          >
            {`${s}${chosen ? " (chosen)" : ""}`}
          </MenuItem>
        )
      })
    )
  }

  getSongOrdinalNumber = () => {
    switch (this.state.songsChosen.length) {
      case 0:
        return "first";
      case 1:
        return "second";
      case 2:
        return "third";
      default:
        return "";
    }
  }

  render() {
    const disableSongInput = this.state.songsChosen.length === 3;
    const disableUserInput = this.state.userChosen.length === 1;
    return (
      <div id="create-challenge-wrapper">
        <Typography id="create-challenge-header" variant="h1">Challenge</Typography>
        <Typography id="create-challenge-subheader" variant="h6">Choose 3 song preferences for your battle:</Typography>
        <ul id="songs-chosen-list">
          {this.state.songsChosen.map(s => {
            return <li key={s}>{s}</li>
          })}
        </ul>
        <div id="song-filter-wrapper">
          <TextField
            type="text"
            placeholder={disableSongInput ? "Great! You've chosen all your songs!" : `Search for the ${this.getSongOrdinalNumber()} song to include`}
            value={this.state.songInput}
            error={Boolean(this.state.songInputError)}
            helperText={this.state.songInputError}
            disabled={disableSongInput}
            onChange={(event) => {
              this.setState({
                songInput: event.target.value,
                songInputError: ""
              })
            }}
            color="primary"
            variant="outlined"
            onClick={(event) => { !disableSongInput && this.setState({ songMenuIsVisible: true }) }}
            classes={{
              root: "song-filter-root",
              input: "song-filter-input"
            }}
            inputProps={{
              className: disableSongInput ? "disabled-input" : ""
            }}
          />
          {this.state.songMenuIsVisible &&
            <div id="song-menu">
              {this.getSongOptions()}
            </div>
          }
        <ul id="users-chosen-list">
          <li>{this.state.userChosen}</li>
        </ul>
          <TextField
            type="text"
            placeholder={disableUserInput ? "Great! You've chosen your opponent" : `Search for an opponent to challenge`}
            value={this.state.userInput}
            error={Boolean(this.state.userInputError)}
            helperText={this.state.userInputError}
            disabled={disableUserInput}
            onChange={(event) => {
              this.setState({
                userInput: event.target.value,
                userInputError: ""
              })
            }}
            color="primary"
            variant="outlined"
            onClick={(event) => { !disableUserInput && this.setState({ userMenuIsVisible: true }) }}
            classes={{
              root: "user-filter-root",
              input: "user-filter-input"
            }}
            inputProps={{
              className: disableUserInput ? "disabled-input" : ""
            }}
          />
          {this.state.userMenuIsVisible &&
            <div id="user-menu">
              {this.getUserOptions()}
            </div>
          }
          <Button
            color="primary"
            className="start-challenge-button"
            variant="contained"
            onClick={(event) => {
              if (this.state.songsChosen.length !== 3) {
                this.setState({ songInputError: "Please choose 3 songs to start a challenge" });
              } else if (this.state.userChosen.length !== 1) {
                this.setState({ userInputError: "Please select an opponent to challenge" });
              } else {
                window.alert(`Creating your challenge with your song choices: ${this.state.songsChosen.join(', ')} and opponent: ${this.state.userChosen}`);
                this.props.createChallenge(this.state.songsChosen, "5f1d2aad57337d140aa86bc2", this.props.auth.token); // TODO REMOVE THE ID WHEN GET USERS BECOMES AVAILABLE ON THE BACKEND
                this.props.history.push('/challenge/list');
              }
            }}
          >
            START CHALLENGE
          </Button>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    searchUser: state.searchUser,
  }
}

const mapDispatchToProps = {
  createChallenge: challengeActions.createChallenge,
  searchUser: userActions.searchUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallenge);