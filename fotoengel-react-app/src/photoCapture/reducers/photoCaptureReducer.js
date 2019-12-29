// Import the PhotoCapture Creators and PhotoCaptureActionTypes

import * as PhotoCaptureActions from '../actions/photoCaptureActions'

export function PhotoCaptureReducer(state = null, action) {
    switch (action.type) {

        case PhotoCaptureActions.UPLOADING_IMAGE: {
          return Object.assign({}, state, {
            uploading: action.uploading
          });
        }

        case PhotoCaptureActions.UPLOAD_IMAGE_SUCCESS: {
          return Object.assign({}, state, {
            uploading: false,
            captured: false
          });
        }

        case PhotoCaptureActions.UPLOAD_IMAGE_FAILURE: {
          return Object.assign({}, state, {
            uploading: false,
            captured: false
          });
        }
            
        default:
          return state
    }
}