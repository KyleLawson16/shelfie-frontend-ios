import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Flex, ActivityIndicator } from 'antd-mobile';
import Video from 'react-native-video';
import styles from '../styles';

class UserSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  onLoad() { // On image load get rid of loading spinner
    this.setState({
      loading: false
    })
  }

  render() {
      return (
        <View>
          <ActivityIndicator
            animating={this.state.loading}
            size="small"
            color="rgb(93,188,210)"
          />
          <Flex>
            {this.props.isVideo
            ?
            <Video source={{uri: this.props.path, mainVer: 1, patchVer: 0}}
              ref={(ref) => {
                this.player = ref
              }}
              rate={1.0}
              volume={1.0}
              muted={true}
              paused={true}
              resizeMode="cover"
              repeat={true}
              style={styles.userSubmissionVideo}
              onLoad={this.onLoad.bind(this)}
            />
            :
            <Image
              source={{uri: this.props.path}}
              style={styles.userSubmissionPhoto}
              onLoad={this.onLoad.bind(this)}
            />
            }
          </Flex>
        </View>
      )
  }
}

export default UserSubmission;
