import { connect } from 'react-redux'
import { uploadImage } from '../actions/photoCaptureActions'
import PhotoCapture from '../components/photoCapture'

const mapStateToProps = (state) => {
  return {
    ...state,
    uploading: state.photoCapture ? state.photoCapture.uploading : false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (image) => { dispatch(uploadImage(image)) },
  }
}

const PhotoCaptureContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoCapture);

export default PhotoCaptureContainer;
