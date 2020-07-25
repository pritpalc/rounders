import { constants } from '../constants';

let initialUserChallenges = [
  {
    songs: [
      "Beyonce - Formation",
      "Megan Thee Stallion - Savage",
      "Billie Eillish - ilomilo"
    ]
  },
  {
    songs: [
      "Billie Eillish - ilomilo",
      "Rihanna -Umbrella",
      "Clint Mansell - Lux Aeterna"
    ]
  }
];

export const getChallengesForUser = (state = { userChallenges: initialUserChallenges }, action) => {
  switch (action.type) {
    case constants.CHALLENGES_REQUEST:
      return {
        requesting: true
      };
    case constants.CHALLENGES_SUCCESS:
      let newState = { ...state };
      newState.succeeded = true;
      newState.userChallenges.push({ songs: action.songs });

      return newState;
    case constants.CHALLENGES_FAILURE:
      return {
        failed: true
      };
    default:
      return state;
  }
};