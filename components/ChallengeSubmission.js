import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Icon, ActivityIndicator } from 'antd-mobile';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import Video from 'react-native-video';
import styles from '../styles';

import { connect } from 'react-redux';
import { addLike, deleteLike } from '../actions';

class ChallengeSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = { lastPress: 0, liked: false, likes: 0, doubleTapOpacity: 1, loaded: false, screenWidth: Dimensions.get('window').width };

    this.handleImagePress = this.handleImagePress.bind(this);
    this.handleLikePress = this.handleLikePress.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentDidMount() {
    this.props.likes.forEach(like => {
      if (this.props.user.random_user_id == like.random_user_id) {
        this.setState({ liked: true });
      }
    })
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
    this.props.addLike(this.props.token, this.props.user.random_user_id, this.props.postID)
    .then((res) => {
      console.log(res);
    })
  }
  unlike() { // Change state of like to false and subtract from # of likes
    this.setState({ liked: false, likes: this.state.likes - 1 });
    this.props.deleteLike(this.props.token, this.props.user.random_user_id, this.props.postID)
    .then((res) => {
      console.log(res);
    })
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
            <Text style={styles.userName}>{this.props.username}</Text>
            <Text style={styles.challengeName}>{this.props.challenge}</Text>
          </View>
        </WingBlank>
        <WhiteSpace size="xs" />
        <Flex justifyContent="center" style={{backgroundColor: 'darkgrey'}}>
          <ActivityIndicator animating={this.state.loaded ? false : true } />
          <TouchableWithoutFeedback
            onPress={this.handleImagePress}
          >
            {this.props.isVideo
            ?
            <Video
              source={{uri: this.props.mediaUrl, mainVer: 1, patchVer: 0}}
              ref={(ref) => {
                this.player = ref
              }}
              rate={1.0}
              volume={1.0}
              muted={false}
              paused={false}
              resizeMode="cover"
              repeat={true}
              onLoad={response => {
                const { width, height } = response.naturalSize;
                const heightScaled = 1.5 * height * (this.state.screenWidth / width);

                this.setState({
                  heightScaled: heightScaled,
                  videoPaused: false,
                  loaded: true,
                });
              }}
              style={{
                width: this.state.screenWidth,
                height: this.state.heightScaled
              }}
            />
            :
            <Image
              source={{ uri: this.props.mediaUrl }}
              width={Dimensions.get('window').width}
              height={(Dimensions.get('window').height * .4)}
              onLoad={this.onImageLoad}
            />
            }

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
            <Text>{this.props.likes.length + this.state.likes} likes</Text>
          </Flex>
          <Flex>
            <Text>{this.props.caption}</Text>
          </Flex>
        </WingBlank>
        <WhiteSpace size="lg" />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { addLike, deleteLike })(ChallengeSubmission);
