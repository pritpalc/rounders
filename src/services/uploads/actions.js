import { constants } from './constants';
import { uploadsServices } from './api';

function postUploads(file, token) {
  return (dispatch) => {
    dispatch({ type: constants.POST_UPLOAD_REQUEST });

    uploadsServices.postUploads(file, token)
      .then(response => {
        dispatch({ type: constants.POST_UPLOAD_SUCCESS, data: response });
      })
      .catch(error => {
        dispatch({ type: constants.POST_UPLOAD_FAILURE, error });
      });
  };
}

export const uploadsActions = {
  postUploads
};