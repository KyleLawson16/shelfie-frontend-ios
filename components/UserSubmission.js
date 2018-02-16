import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Flex } from 'antd-mobile';
import Video from 'react-native-video';
import ActivityIndicator from 'react-native-activity-indicator';
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
          {this.state.loading
            ?
            <ActivityIndicator
              size={50}
              thickness={1}
              color="rgb(0,206,202)"
            />
            :
            null
          }
          <Flex style={{ position: 'absolute', top: 0}}>
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
