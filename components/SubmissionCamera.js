'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

class SubmissionCamera extends Component {
  render() {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Icon name="ios-reverse-camera-outline" size={20} color="white" />
          <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}>
            <Text style={{fontFamily: 'Ionicons'}}><Icon name="ios-radio-button-on" size={30} color="white" /></Text>
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

export default SubmissionCamera;
