import { constants } from '../constants';

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
