import { combineReducers } from 'redux';
import { constants } from './constants';
import { STATUS } from '../utils/reducers';

export const postUploadsReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.POST_UPLOAD_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.POST_UPLOAD_SUCCESS:
      return {
        status: STATUS.success,
        data: action.data,
      };
    case constants.POST_UPLOAD_FAILURE:
      return {
        status: STATUS.failed,
        error: action.error
      };
    default:
      return state;
  }
};

export default combineReducers({
  postUploads: postUploadsReducer
});