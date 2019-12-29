//Import the PhotoCapture API 

import { PhotoCaptureApi } from "../../api/photoCaptureApi";
import Constants from '../common/constants';
import * as jsPDF from 'jspdf'


// These are the action type constants.

// Upload Image
export const UPLOADING_IMAGE = 'UPLOADING_IMAGE'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'


//These are the action types

export function uploadImage(photo){
    return (dispatch, getState) => {
        dispatch(UploadingImage(true));
        return PhotoCaptureApi.getSignedUrlForS3Upload().then(response => {
            if (response.data.success === true) {
              uploadToS3(response, photo, dispatch);
            }
        }).catch(err => {
            console.log(err);
            dispatch(UploadImageFailure(Constants.API_RESPONSE.UPLOAD_IMAGE_FAILURE))
        })
    }
}

function uploadToS3(signedRequestResponse, picture, dispatch) {
  let returnData = signedRequestResponse.data.data.returnData;
  let signedRequest = returnData.signedRequest;
  let url = returnData.url;
  console.log("Received a signed request " + signedRequest);

  // Put the fileType in the headers for the upload
  var options = {
    headers: {
      //'Content-Encoding': 'base64',
      'Content-Type': 'application/pdf'
    }
  };

  const pdf = new jsPDF();
  pdf.addImage(picture, 'JPEG', 10, 10);
  let buffer = pdf.output('arraybuffer');

  PhotoCaptureApi.uploadToS3(signedRequest, buffer, options).then(result => {
    console.log(JSON.stringify(result));
    console.log(url);
    dispatch(UploadImageSuccess(Constants.API_RESPONSE.SUCCESS))
  })
  .catch(error => {
    console.log(JSON.stringify(error))
    dispatch(UploadImageFailure(Constants.API_RESPONSE.UPLOAD_IMAGE_FAILURE))
  });
}

export function UploadingImage(isUploading) {
  return {
    type: UPLOADING_IMAGE,
    uploading: isUploading
  };
};

export function UploadImageSuccess(result) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    result
  };
};

export function UploadImageFailure(result) {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    result
  };
};