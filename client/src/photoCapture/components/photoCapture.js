import React, { Component } from 'react';
import logo from '../../logo.png';
import '../../App.css';

export default class PhotoCapture extends Component {
    constructor() {
      super();
      this.state = {
        capturedImage: null,
        captured: false,
        uploading: false
      }
    }

    /**
     * Processes available devices and identifies one by the label
     * @memberof PhotoCapture
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof PhotoCapture
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        let facingMode = { exact: 'environment'}
        let frontCamera = true;
        if (frontCamera) { // To enable front camera/webcam
          facingMode = 'user'
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            deviceId,
            facingMode: facingMode
          }
        });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof PhotoCapture
     * @instance
     * @override
     */
    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof PhotoCapture
     * @instance
     */
    captureImage = () => {
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 640, 480);
        const capturedData = this.canvas.toDataURL('image/jpeg', 0.8);

        this.setState({
          captured: true,
          capturedImage: capturedData
        });
    };

    /**
     * Discards the preview image
     * @memberof PhotoCapture
     * @instance
     */
    discardImage = () => {
        this.setState({
            captured: false,
            capturedImage: null
        })
    }
    
    /**
     * Upload the image to s3
     * Although user clicks the send email button, client only uploads the image to s3
     * It is the responsibility of backend to send email asynchronously
     * @memberof PhotoCapture
     * @instance
     */
    uploadImage = () => {
      this.props.uploadImage(this.state.capturedImage);
    }

    componentWillReceiveProps(nextProps){
      if(this.props.uploading && (nextProps.uploading !== this.props.uploading)) {        
        this.setState({
          captured: false,
          capturedImage: null
        })
      }
    }  

    render() {

      const imageDisplay = this.state.capturedImage ?
          <img src={this.state.capturedImage} alt="captured" width="350"/>
          :
          <span />;

      const buttons = this.state.captured ?
          <div>
              <button className="deleteButton" onClick={this.discardImage} > Delete Photo </button>
              <button className="captureButton" onClick={this.uploadImage} > Send Photo </button>
          </div> :
          <button className="captureButton" onClick={this.captureImage} > Take Picture </button>

      const uploading = this.props.uploading ?
          <div><p> Sending Image, please wait ... </p></div>
          :
          <span />

      return (
          <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt='fotoengel-logo'/>
                <h1 className="App-title">fotoengel</h1>
              </header>

              {uploading}
              <video autoPlay playsInline muted id="camera-feed" ref={ref => (this.videoPlayer = ref)} width="100%" height="200" />
              <br />
              <div className="imageCanvas">
                {imageDisplay}
              </div>
              {buttons}
              <canvas width="640" height="480" ref={ref => (this.canvas = ref)} hidden/>
          </div>
      )
    }
}