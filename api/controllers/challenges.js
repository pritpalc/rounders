let Challenge = require('../models/challenges');

async function getChallenges(req, res) {
  try {
    let challenges =
      await Challenge.find().exec();

    if (!challenges) return res.status(400).send();
    return res.json({ challenges: challenges });
  } catch (err) {
    return res.status(400).send();
  }
}

async function getChallenge(req, res) {
  try {
    let challenge =
      await Challenge.find().exec();

    if (!challenge) return res.status(400).send();
    return res.json({ challenge: challenge });
  } catch (err) {
    return res.status(400).send();
  }
}

async function postChallenge(req, res) {
  try {
    let challenge = new Challenge({
      songs: req.body.songs,
      challenger: req.body.challenger,
    });

    challenge = await challenge.save();
    return res.json(challenge);
  } catch (err) {
    return res.status(400).send();
  }
}

module.exports = {
  getChallenges: getChallenges,
  getChallenge: getChallenge,
  postChallenge: postChallenge,
};