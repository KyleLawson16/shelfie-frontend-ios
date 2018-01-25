'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { Flex } from 'antd-mobile';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

class SubmissionCamera extends Component {
  constructor(props) {
    super(props);

    this.state = { cameraDirection: "back", recording: false, elapsedSeconds: false, elapsedMinutes: 0, elapsedTenSeconds: false };
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  recordVideo() {
    this.setState({ recording: true, elapsedSeconds: 0 });
    this.timer = setInterval(this.tick.bind(this), 1000)
    console.log('start record');
  }
  stopVideo() {
    if (this.state.recording) {
      console.log('stop record');
      this.setState({ elapsedSeconds: false, recording: false });
      clearInterval(this.timer);
    }
  }

  tick () {
    console.log(this.state.elapsedTenSeconds);
    if (this.state.elapsedSeconds == 9) {
      this.setState({ elapsedSeconds: (this.state.elapsedSeconds + 1), elapsedTenSeconds: true });
    }
    else if (this.state.elapsedSeconds == 59) {
      this.setState({ elapsedSeconds: 0, elapsedMinutes: (this.state.elapsedMinutes + 1), elapsedTenSeconds: false });
    }
    else {
      this.setState({ elapsedSeconds: (this.state.elapsedSeconds + 1) });
    }

  }

  switchCamera() {
    if (this.state.cameraDirection == "back") {
      this.setState({ cameraDirection: "front" });
    } else {
      this.setState({ cameraDirection: "back" });
    }
    console.log(this.state.cameraDirection);
  }

  render() {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          type={this.state.cameraDirection}
          style={styles.cameraBox}
          aspect={Camera.constants.Aspect.fill}>
          <Flex alignItems="flex-start" direction="row" style={styles.cameraSwitch}>
            <Flex.Item>
            </Flex.Item>
            <Flex.Item>
              <Text style={{color: 'red', backgroundColor: 'transparent', textAlign: 'center', marginTop: 15}}>
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
              onPress={this.takePicture.bind(this)}
              onLongPress={this.recordVideo.bind(this)}
              onPressOut={this.stopVideo.bind(this)}
              activeOpacity={0.5}
              underlayColor={'transparent'}
            >
              <Icon
                name={this.state.recording ? "md-radio-button-off" : "ios-radio-button-off" }
                size={90}
                style={styles.iconBackground}
                color={this.state.recording ? "red" : "white"}
              />
          </TouchableHighlight>
          </View>
        </Camera>
      </View>
    );
  }
}

export default SubmissionCamera;
