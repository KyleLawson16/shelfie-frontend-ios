import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { WhiteSpace, List, InputItem, Button, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import ActivityIndicator from 'react-native-activity-indicator';
import Video from 'react-native-video';
import styles from '../styles';

import { connect } from 'react-redux';
import { createPost } from '../actions';

class SubmissionPost extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  handleSubmit() {
    this.setState({ loading: true });
    this.props.form.validateFields((error, value) => {
      var is_video = false;
      if (this.props.type == "video") {
        is_video = true;
      }
      this.props.createPost(
        this.props.token,
        this.props.userID,
        this.props.gameID,
        this.props.challenge.random_challenge_id,
        is_video,
        this.props.mediaObject.postResponse.location,
        value.caption
      ).then((res) => {
        if (res.payload.status == 201) {
          this.setState({ loading: false });
          this.props.submitPost();
        }
        console.log(res);
      });
    });
  }

  render() {
    console.log(this.props.path);
    console.log(this.props.type);
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 22, textAlign: 'center'}}>Add a caption</Text>
        {this.props.type == "photo"
          ?
          <Image
            source={{uri: this.props.path, isStatic:true}}
            style={{ width: '90%', height: 300, marginLeft: '5%' }}
          />
          :
          <View>
            <Video source={{uri: this.props.path, mainVer: 1, patchVer: 0}}
              ref={(ref) => {
                this.player = ref
              }}
              rate={1.0}
              volume={1.0}
              muted={false}
              paused={false}
              resizeMode="cover"
              repeat={true}
              style={{ width: '90%', height: 300, marginLeft: '5%'  }}
            />
          </View>
        }
        <List style={styles.authForm}>
          <InputItem
            {...getFieldProps('caption', {
            })}
            type="text"
            placeholder="Wooooo..."
            labelNumber={4}
            maxLength={30}
          >Caption</InputItem>
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={() => this.handleSubmit()}
          >Submit Post</Button>
        </List>
        {this.state.loading
          ?
          <View style={[styles.activityIndicatorCenter, styles.activityIndicatorBackground]}>
            <ActivityIndicator
              size={50}
              thickness={1}
              color="rgb(0,206,202)"
            />
          </View>
          : null
        }
      </ScrollView>
    )
  }
}

const SubmissionPostWrapper = createForm()(SubmissionPost);

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { createPost })(SubmissionPostWrapper);
