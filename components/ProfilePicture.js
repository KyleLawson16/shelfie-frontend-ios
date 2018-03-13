'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native';
import { Flex, Button, WhiteSpace } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

import { connect } from 'react-redux';
import { updateProfilePicture, fetchAmazonS3 } from '../actions';

import { RNS3 } from 'react-native-aws3';

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
      amazonS3: false,
    };

    this.choosePhoto = this.choosePhoto.bind(this);
  }

  componentWillMount() {
    this.props.fetchAmazonS3(this.props.token)
    .then((res) => {
      this.setState({ amazonS3: res.payload.data[0] });
    });
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
          name: `${this.props.user.random_user_id}-${name}`,
          type: type
        };

        const options = {
          keyPrefix: `users/profile-photos/`,
          bucket: this.state.amazonS3.bucket,
          region: this.state.amazonS3.region,
          accessKey: this.state.amazonS3.access_key,
          secretKey: this.state.amazonS3.secret_access_key,
          successActionStatus: 201
        };
        console.log(options);

        RNS3.put(file, options).then(response => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          else {
            this.setState({
              handleSave: false, // Set the process of handling save to finished (* will be called after getting callback from database)
              saved: true, // Acknowledge that a photo/video has been saved
              loading: false,
            });
            this.props.updateProfilePicture(
              this.props.token,
              this.props.user.random_user_id,
              response.body.postResponse.location
            )
            .then((res) => {
              console.log(res);
              this.props.path(response.body.postResponse.location);
              this.props.finishEdit();
            });
          }
        });

      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
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
    })
    .catch((error) => {
      this.setState({ loading: false });
    });
  }

  render() {
      return (
        <View>
          <WhiteSpace size="lg" />
          <Flex
            style={styles.landingContent}
            align="center"
            justify="center"
          >
            <Image
              source={{ uri: this.props.user.profile_picture }}
              style={styles.userPhotoEdit}
            />
          </Flex>
          <WhiteSpace size="lg" />
          <Flex
            style={styles.landingContent}
            align="center"
            justify="center"
          >
            <Flex.Item>
              <Text
                style={styles.gameLocation}
              >
                Change Profile Picture
              </Text>
              <Button
                style={styles.authFormBtn}
                onPressIn={this.choosePhoto}
                type="primary">
                Choose Photo
              </Button>
            </Flex.Item>
          </Flex>
          <View style={{ position: 'absolute', top: '110%', left: '41%', zIndex: 9999 }}>
            <ActivityIndicator
              animating={this.state.loading}
              size={80}
              thickness={1}
              color="rgb(0,206,202)"
            />
          </View>
        </View>
      );
    }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { updateProfilePicture, fetchAmazonS3 })(ProfilePicture);
