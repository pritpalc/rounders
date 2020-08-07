import { constants } from '../constants';

let initialUsers = [
    {
        "bio": "",
        "_id": "5f1d2aad57337d140aa86bc2",
        "firstName": "Roger",
        "lastName": "Rabbit",
        "email": "rabbit@roger.com",
        "username": "rogerrabbit",
        "createdAt": "2020-07-26T07:03:09.665Z",
        "updatedAt": "2020-07-26T07:03:09.665Z",
        "__v": 0
    },
    {
        "bio": "",
        "_id": "5f2b353157337d140aa86beb",
        "firstName": "Jason",
        "lastName": "Smith",
        "email": "jsmith@alumni.ubc.ca",
        "username": "bison",
        "createdAt": "2020-08-05T22:39:45.856Z",
        "updatedAt": "2020-08-05T22:39:45.856Z",
        "__v": 0
    }
];

export const STATUS = {
  request: 'requesting',
  success: 'success',
  failed: 'failed'
};

export const getUsers = (state = {}, action) => {
  switch (action.type) {
    case constants.SEARCH_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.SEARCH_SUCCESS:
      return {
        data: action.res,
        status: STATUS.success
      };
    case constants.SEARCH_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};
