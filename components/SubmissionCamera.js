'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native';
import { Flex, ActivityIndicator } from 'antd-mobile';
import Camera from 'react-native-camera';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

import SubmissionPostWrapper from './SubmissionPost';
import TopNavbar from './TopNavbar';

import { RNS3 } from 'react-native-aws3';

const ACCESS_KEY = 'AKIAJJ2VBIDH6Z4LWTEA';
const SECRET_ACCESS_KEY = '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';

class SubmissionCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraDirection: "back",
      path: false,
      captureType: "photo",
      recording: false,
      elapsedSeconds: false,
      elapsedTenSeconds: false,
      elapsedMinutes: 0,
      handleSave: false,
      saved: false,
      loading: false,
    };
  }

  // Camera functions
  switchCamera() { // Called when camera direction button is pressed
    if (this.state.cameraDirection == "back") { // Set camera direction to opposite of what it currently is
      this.setState({ cameraDirection: "front" });
    } else {
      this.setState({ cameraDirection: "back" });
    }
  }

  deleteCapture() { // Called when user taps X button
    this.setState({ path: false }); // Delete photo path
  }

  saveCapture() { // Callend when user taps save arrow button
    this.setState({ loading: true });
    const name = this.makeid();
    var type = "image/png";
    if (this.state.captureType == "video") {
      type = "video/mp4"
    }
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: this.state.path,
      name: `${this.props.gameID}-${name}`,
      type: type
    };

    const options = {
      keyPrefix: `posts/${this.state.captureType}s/`,
      bucket: "shelfie-challenge",
      region: "us-west-1",
      accessKey: ACCESS_KEY,
      secretKey: SECRET_ACCESS_KEY,
      successActionStatus: 201
    };

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      else {
        this.setState({
          handleSave: false, // Set the process of handling save to finished (* will be called after getting callback from database)
          saved: true, // Acknowledge that a photo/video has been saved
          loading: false,
        });
        this.props.mediaObject(response.body);
        this.props.saved(true); // Pass saved to parent SubmissionPage
      }
    });


  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  // Photo functions
  takePhoto() { // Called on a press of the capture button
    const options = {};
    this.camera.capture({metadata: options}) // Capture a photo
      .then((data) => { // On image capture
        this.setState({
          path: data.path, // Save photo path to
          captureType: "photo" // Set type to photo
        });
        this.props.path(data.path); // Pass path to parent SubmissionPage
        this.props.type("photo"); // Pass type to parent SubmissionPage
      })
      .catch(err => console.error(err)); // Log an error
  }

  choosePhoto() { // Called when user taps the photo library button
    var options = {};
    this.setState({ loading: true });
    ImagePicker.launchImageLibrary(options, (response)  => { // Launch photo library
      this.setState({
        loading: false,
        path: response.uri, // Record path of chosen photo
        captureType: "photo" // Set type to photo
      });
      this.props.path(response.uri); // Pass path to parent SubmissionPage
      this.props.type("photo"); // Pass type to parent SubmissionPage
    });
  }

  // Video functions
  startVideoRecord() { // Called on a long press of the capture button
    this.setState({
      recording: true, // Set recording to true
      elapsedSeconds: 0, // Set the video length to 0
      captureType: "video" // Set the type to video
    });
    const options = {};
    this.camera.capture({metadata: options}) // Start video capture
      .then((data) => {
        this.setState({ path: data.path }); // Save the path of the video
        this.props.path(data.path); // Pass path to parent SubmissionPage
        this.props.type("video"); // Pass type to parent SubmissionPage
      })
      .catch(err => console.error(err)); // Log an error
    this.timer = setInterval(this.tick.bind(this), 1000) // Start timer and call tick function on 1 second intervals
  }

  stopVideoRecord() { // Called on let go of long press
    if (this.state.recording) { // Only if recording...
      this.camera.stopCapture(); // Stop video record
      this.setState({
        elapsedSeconds: false, // Set Video length back to false
        recording: false // Set recording to false
      });
      clearInterval(this.timer); // Stop timer intervals
    }
  }

  // Timer functions
  componentWillUnmount() { // End timer on component unmounting
    clearInterval(this.timer)
  }

  tick() { // Called every 1 second interval
    console.log(this.state.elapsedTenSeconds);
    if (this.state.elapsedSeconds == 9) { // If seconds value is less than 10
      this.setState({
        elapsedSeconds: (this.state.elapsedSeconds + 1), // Add 1 second to total elapsed seconds
        elapsedTenSeconds: true // Acknowledge that ten or more seconds have elapsed
      });
    } else if (this.state.elapsedSeconds == 59) { // If seconds value is about to reach 1 minute
      this.setState({
        elapsedSeconds: 0, // Reset total elapsed seconds to zero
        elapsedMinutes: (this.state.elapsedMinutes + 1), // Add 1 minute to total elapsed minutes
        elapsedTenSeconds: false // Reset tens value to false
      });
    } else { // Otherwise
      this.setState({
        elapsedSeconds: (this.state.elapsedSeconds + 1) // Just add 1 second to total elapsed seconds
      });
    }
  }

  render() {
    if (this.state.path) {
      return (
        <View style={styles.cameraContainer}>
          {this.state.captureType == "photo"
            ?
            <Image
              source={{uri: this.state.path, isStatic:true}}
              style={{ flex: 1}}
            />
            :
            <Video source={{uri: this.state.path, mainVer: 1, patchVer: 0}}
              ref={(ref) => {
                this.player = ref
              }}
              rate={1.0}
              volume={1.0}
              muted={false}
              paused={false}
              resizeMode="cover"
              repeat={true}
              style={{ flex: 1}}
            />
          }
          <TouchableOpacity
            style={{position: 'absolute', top: 25, left: 20}}
            onPress={this.deleteCapture.bind(this)}
          >
            <Icon
              style={styles.iconBackground}
              name="ios-close"
              size={50}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{position: 'absolute', bottom: 20, right: 20}}
            onPressIn={() => {this.setState({ saveCapture: true })}}
            onPress={this.saveCapture.bind(this)}
          >
            <Icon
              style={styles.iconBackground}
              name={this.state.saveCapture ? "ios-send" : "ios-send-outline"}
              size={50}
              color="white"
            />
            <Text style={[styles.iconBackground, {color: "white", marginTop: -10}]}>
              Save
            </Text>
          </TouchableOpacity>
          {this.state.loading
            ? <ActivityIndicator toast text="loading" />
            : null
          }
        </View>
      )
    }
    else {
      return (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            type={this.state.cameraDirection}
            style={styles.cameraBox}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}
            captureAudio={true}
            captureMode={this.state.recording ? Camera.constants.CaptureMode.video : Camera.constants.CaptureMode.still}>
            <Flex alignItems="flex-start" direction="row" style={styles.cameraSwitch}>
              <Flex.Item>
              </Flex.Item>
              <Flex.Item>
                <Text style={{color: 'red', backgroundColor: 'transparent', textAlign: 'center', marginTop: 15, fontSize: 16}}>
                  {this.state.elapsedSeconds
                    ? (this.state.elapsedTenSeconds
                      ? this.state.elapsedMinutes + `:${this.state.elapsedSeconds}`
                      : this.state.elapsedMinutes + `:0${this.state.elapsedSeconds}`)
                    : null
                  }
                </Text>
              </Flex.Item>
              <Flex.Item alignItems="flex-end">
                <TouchableOpacity
                  onPress={this.switchCamera.bind(this)}
                  >
                  <Icon
                    name={this.state.cameraDirection == "front" ? "ios-reverse-camera" : "ios-reverse-camera-outline"}
                    size={45}
                    style={styles.iconBackground}
                    color="white"
                  />
                </TouchableOpacity>
              </Flex.Item>
            </Flex>
            <View style={styles.cameraBottomNav}>
              <TouchableHighlight
                onPress={this.takePhoto.bind(this)}
                onLongPress={this.startVideoRecord.bind(this)}
                onPressOut={this.stopVideoRecord.bind(this)}
                activeOpacity={0.5}
                underlayColor={'transparent'}
              >
                <Icon
                  name="ios-radio-button-off"
                  size={90}
                  style={styles.iconBackground}
                  color={this.state.recording ? "red" : "white"}
                />
              </TouchableHighlight>
              <TouchableOpacity
                style={{position: 'absolute', bottom: 15, left: 20}}
                onPress={this.choosePhoto.bind(this)}
              >
                <Icon
                  style={styles.iconBackground}
                  name="ios-images"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </Camera>
          {this.state.loading
            ? <ActivityIndicator toast text="loading" />
            : null
          }
        </View>
      );
    }
  }
}

export default SubmissionCamera;
