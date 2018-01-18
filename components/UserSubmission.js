import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Flex, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

class UserSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  onLoad() { // On image load get rid of loading spinner
    this.setState({
      loaded: true
    })
  }

  render() {
      return (
        <View>
          <ActivityIndicator animating={this.state.loaded ? false : true } />
          <Flex>
            <Image
              source={require('../assets/images/image.jpg')}
              style={styles.userSubmissionPhoto}
              onLoad={this.onLoad.bind(this)}
            />
          </Flex>
        </View>
      )
  }
}

export default UserSubmission;
