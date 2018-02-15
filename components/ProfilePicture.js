'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native';
import { Flex, ActivityIndicator, Button } from 'antd-mobile';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

import { connect } from 'react-redux';
import { updateProfilePicture } from '../actions';

import { RNS3 } from 'react-native-aws3';

const ACCESS_KEY = 'AKIAJJ2VBIDH6Z4LWTEA';
const SECRET_ACCESS_KEY = '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';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: false,
      path: false,
      captureType: "photo",
      handleSave: false,
      saved: false,
      loading: false,
    };

    this.choosePhoto = this.choosePhoto.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
  }

  // Camera functions
  deleteCapture() { // Called when user taps X button
    this.setState({ path: false }); // Delete photo path
  }

  saveCapture() { // Callend when user taps save arrow button
    const name = this.makeid();
    var type = "image/png";
    this.setState({ loading: true });
      ImagePicker.openCropper({
        path: this.state.path,
        cropperCircleOverlay: true,
      }).then(image => {
        console.log(image);
        const file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: image.path,
          name: `${this.props.userID}-${name}`,
          type: type
        };

        const options = {
          keyPrefix: `users/profile-photos/`,
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
            this.props.updateProfilePicture(this.props.token, this.props.userID, response.body.postResponse.location)
            .then((res) => {
              console.log(res);
              this.props.path(response.body.postResponse.location);
              this.props.finishEdit();
            });
          }
        });

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
      })
      .catch(err => console.error(err)); // Log an error
  }

  choosePhoto() { // Called when user taps the photo library button
    var options = {};
    this.setState({ loading: true });
    ImagePicker.openPicker({
      loadingLabelText: "Processing..."
    }).then(image => {
      console.log(image);
      this.setState({
        path: image.path, // Record path of chosen photo
      });
      this.saveCapture();
    });
  }

  render() {
    if (this.state.camera) {
      return (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            type="front"
            style={styles.cameraBox}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}
            captureMode={Camera.constants.CaptureMode.still}>
            <View style={styles.cameraBottomNav}>
              <TouchableHighlight
                onPress={this.takePhoto}
                activeOpacity={0.5}
                underlayColor={'transparent'}
              >
                <Icon
                  name="ios-radio-button-off"
                  size={90}
                  style={styles.iconBackground}
                  color="white"
                />
              </TouchableHighlight>
              <TouchableOpacity
                style={{position: 'absolute', bottom: 15, left: 20}}
                onPress={this.choosePhoto}
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
      )
    }
    else {
      return (
        <View>
          <Text>Change Profile Picture</Text>
          <Button
            style={styles.authFormBtn}
            onPressIn={() => this.setState({ camera: true })}
            type="primary">
            Take Photo
          </Button>
          <Button
            style={styles.authFormBtn}
            onPressIn={this.choosePhoto}
            type="primary">
            Choose Photo
          </Button>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { updateProfilePicture })(ProfilePicture);
