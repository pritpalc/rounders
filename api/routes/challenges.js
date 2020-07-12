var express = require('express');
var router = express.Router();
var cors = require('cors');

let controller = require('../controllers/challenges');

/* GET challenges */
router.get('/', cors(), [controller.getChallenges]);

/* GET a challenge by id */
router.get('/:id', cors(), [controller.getChallenge]);

/* POST challenge */
router.post('/', cors(), [controller.postChallenge]);

router.options('*', cors());

module.exports = router;