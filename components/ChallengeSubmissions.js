import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import styles from '../styles';

class ChallengeSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = { lastPress: 0, liked: false };

    this.handleImagePress = this.handleImagePress.bind(this);
    this.handleLikePress = this.handleLikePress.bind(this);
  }

  handleImagePress() {
    var delta = new Date().getTime() - this.state.lastPress; // Calculating time since the image was last pressed

    if (delta < 300) { // If time is less than 300ms (indicating double tap)
      console.log('double tap');
      if (!this.state.liked) {
        this.setState({ liked: true }); // Change state of liked
      } else {
        this.setState({ liked: false });
      }
    }

    this.setState({
      lastPress: new Date().getTime() // Reset the time of the last image press
    })
  }

  handleLikePress() {
    if (!this.state.liked) {
      this.setState({ liked: true }); // Change state of liked when icon is pressed
    }
    else {
      this.setState({ liked: false });
    }
  }

  render() {
    return (
      <View>
        <WhiteSpace />
        <WingBlank size="md">
          <View>
            <Text style={styles.userName}>KyleLawson16</Text>
            <Text style={styles.challengeName}>Challenge Name</Text>
          </View>
        </WingBlank>
        <WhiteSpace size="xs" />
        <Flex>
          <TouchableOpacity onPress={this.handleImagePress}>
            <Image
              source={require('../assets/images/challenge_photo.jpg')}
              style={styles.challengeSubmissionPhoto}
            />
          </TouchableOpacity>
        </Flex>
        <WhiteSpace size="sm" />
        <WingBlank size="md">
          <Flex>
            <TouchableOpacity onPress={this.handleLikePress} style={{ width: 25}}>
              <View>
                <Icon type={this.state.liked ? "\ue64c" : "\ue69d"} />
              </View>
            </TouchableOpacity>
            <Text>7 likes</Text>
          </Flex>
        </WingBlank>
      </View>
    )
  }
}

export default ChallengeSubmissions;
