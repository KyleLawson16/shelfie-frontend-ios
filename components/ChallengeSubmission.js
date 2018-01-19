import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Icon, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

class ChallengeSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = { lastPress: 0, liked: false, likes: 7, doubleTapOpacity: 1, loaded: false };

    this.handleImagePress = this.handleImagePress.bind(this);
    this.handleLikePress = this.handleLikePress.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  handleImagePress() { // When image is double tapped
    var delta = new Date().getTime() - this.state.lastPress; // Calculating time since the image was last pressed

    if (delta < 300) { // If time is less than 300ms (indicating double tap)
      console.log('double tap');
      this.setState({ doubleTapOpacity: 0.6 }); // Image opacity on double tap
      if (!this.state.liked) {
        this.like();
        setTimeout(() => {this.setState({ doubleTapOpacity: 1 })}, 100); // Return image opacity to normal after double tap
      } else {
        this.unlike();
        setTimeout(() => {this.setState({ doubleTapOpacity: 1 })}, 100);
      }
    }

    this.setState({
      lastPress: new Date().getTime() // Reset the time of the last image press
    })
  }

  handleLikePress() { // When like icon is pressed
    if (!this.state.liked) {
      this.like();
    } else {
      this.unlike();
    }
  }

  like() { // Change state of like to true and add to # of likes
    this.setState({ liked: true, likes: this.state.likes + 1 });
  }
  unlike() { // Change state of like to false and subtract from # of likes
    this.setState({ liked: false, likes: this.state.likes - 1 });
  }

  onImageLoad() { // On image load get rid of loading spinner
    this.setState({
      loaded: true
    })
  }

  render() {
    return (
      <View>
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <View>
            <Text style={styles.userName}>KyleLawson16</Text>
            <Text style={styles.challengeName}>Challenge Name</Text>
          </View>
        </WingBlank>
        <WhiteSpace size="xs" />
        <Flex>
          <ActivityIndicator animating={this.state.loaded ? false : true } />
          <TouchableWithoutFeedback
            onPress={this.handleImagePress}
          >
            <Image
              source={require('../assets/images/challenge_photo.jpg')}
              style={[styles.challengeSubmissionPhoto, {opacity: this.state.doubleTapOpacity}]}
              onLoad={this.onImageLoad}
            />
        </TouchableWithoutFeedback>
        </Flex>
        <WhiteSpace size="sm" />
        <WingBlank size="md">
          <Flex>
            <TouchableOpacity onPress={this.handleLikePress} style={{ width: 25}}>
              <View>
                <Icon type={this.state.liked ? "\ue64c" : "\ue69d"} />
              </View>
            </TouchableOpacity>
            <Text>{this.state.likes} likes</Text>
          </Flex>
        </WingBlank>
        <WhiteSpace size="lg" />
      </View>
    )
  }
}

export default ChallengeSubmission;
