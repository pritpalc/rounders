import React from 'react';
import NavBar from '../components/Navbar';
import './styles.css';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <ProfileHeader />
        <ChallengeInfo />
        <ProfileNavBar />
        <ProfileInfo />
        <Footer />
      </div>
    );
  }
}

function ProfileHeader() {
    return (
      <div id="profileHeader">
        <h2>Jeffrey Chang</h2>
        <div className="flex_center">
          <span className="add_margin">134 Followers</span>
          <span className="add_margin">213 Following</span>
        </div>
      </div>
    );
}

function ChallengeInfo() {
  const classes = useStyles();
  return (
    <div className="flex_center_space">
      <div className="stas">
        <Avatar className={`${classes.orange} ${classes.large} add_margin`}>96</Avatar>
        <h3>Challenges Completed</h3>
      </div>
      <div className="stas">
        <Avatar className={`${classes.orange} ${classes.large} add_margin`}>73</Avatar>
        <h3>Victories</h3>
      </div>
      <div className="stas">
        <Avatar className={`${classes.orange} ${classes.large} add_margin`}>76%</Avatar>
        <h3>Win Rate</h3>
      </div>
    </div>
  );
}

function ProfileNavBar() {
  return (
    <div>
    </div>
  );
}

function ChallengeHistory() {
  return (
    <div>
    </div>
  );
}

function ProfileInfo() {
  return (
    <div class="nav">
    <ul>
      <ListItem>
        <p id="subheading">
          Name: 
        </p> <p>Jeffrey Chang</p></ListItem>
      <Divider />
      <ListItem><p id="subheading">Age: </p><p> 28 yrs old</p></ListItem>
      <Divider />
      <ListItem><p id="subheading">Location: </p ><p>Vancouver</p></ListItem>
      <Divider />
      <ListItem><p id="subheading">Signature: </p><p> Are u having fun? Im having fun.</p></ListItem>
    </ul>
  </div>
  );
}

export default MainPage;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  }
}));