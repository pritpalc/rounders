import React from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core';
// Style
import './style.css';

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
      input: "",
      inputError: "",
      songOptions: FAKE_SONG_LIST,
      songsChosen: [],
      menuIsVisible: false
    }
  }

  componentDidUpdate(prevProps, prevInput) {
    if (prevInput.input !== this.state.input) {
      let regex = new RegExp(`${this.state.input}`, 'ig');
      let songOptions = [];
      FAKE_SONG_LIST.forEach(s => {
        s.match(regex) && songOptions.push(s);
      });
      this.setState({ songOptions });
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
                  menuIsVisible: state.songsChosen.length === 2 ? false : state.menuIsVisible,
                  input: state.songsChosen.length === 2 ? "" : state.input,
                  inputError: ""
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
    const disableInput = this.state.songsChosen.length === 3;
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
            placeholder={disableInput ? "Great! You've chosen all your songs!" : `Search for the ${this.getSongOrdinalNumber()} song to include`}
            value={this.state.input}
            error={Boolean(this.state.inputError)}
            helperText={this.state.inputError}
            disabled={disableInput}
            onChange={(event) => {
              this.setState({
                input: event.target.value,
                inputError: ""
              })
            }}
            color="primary"
            variant="outlined"
            onClick={(event) => { !disableInput && this.setState({ menuIsVisible: true }) }}
            classes={{
              root: "song-filter-root",
              input: "song-filter-input"
            }}
            inputProps={{
              className: disableInput ? "disabled-input" : ""
            }}
          />
          {this.state.menuIsVisible &&
            <div id="song-menu">
              {this.getSongOptions()}
            </div>
          }
          <Button
            color="primary"
            className="start-challenge-button"
            variant="contained"
            onClick={(event) => {
              if (this.state.songsChosen.length !== 3) {
                this.setState({ inputError: "Please choose 3 songs to start a challenge" });
              } else {
                window.alert(`Creating your challenge with your choices: ${this.state.songsChosen.join(', ')}`)
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

export default CreateChallenge;