import {HttpClient} from './httpClient';
import {default as UUID} from "uuid";

// This is the API. The backend root URL can be set from here.

const API = 'http://localhost:5000'

//Setting the camera URI

const PHOTO_CAPTURE_API = `/foto`

const getSignedUrlForS3Upload = () => {
    let url = `${PHOTO_CAPTURE_API}/sign_s3/`
    let payload = {
      fileName: `image-${UUID.v4()}`,
      fileType: 'application/pdf'
    }
    return HttpClient.post(url, payload)
}

const uploadToS3 = (url, file, options) => {
  return HttpClient.put(url, file, options);
}


//Encapsulating in a JSON object

const PhotoCaptureApi = {getSignedUrlForS3Upload, uploadToS3}

export {PhotoCaptureApi}