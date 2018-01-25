import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import Video from 'react-native-video';
import styles from '../styles';

class SubmissionPost extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.path);
    console.log(this.props.type);
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25, textAlign: 'center'}}>Add a caption</Text>
        {this.props.type == "photo"
          ?
          <Image
            source={{uri: this.props.path, isStatic:true}}
            style={{ width: '90%', height: 300, marginLeft: '5%' }}
          />
          :
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
        }
      </View>
    )
  }
}

export default SubmissionPost;
