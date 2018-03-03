import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Modal } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

import { connect } from 'react-redux';
import { addLike, deleteLike, updatePost, deletePost, reportPost } from '../actions';

const operation = Modal.operation;
const prompt = Modal.prompt;
const alert = Modal.alert;

class ChallengeSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPress: 0,
      liked: false,
      likes: 0,
      doubleTapOpacity: 1,
      loaded: false,
      playBtn: true,
      muted: true,
      paused: true,
      screenWidth: Dimensions.get('window').width,
      newCaption: false,
    };

    this.handleImagePress = this.handleImagePress.bind(this);
    this.handleLikePress = this.handleLikePress.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.handlePauseVideo = this.handlePauseVideo.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.handleUserPress = this.handleUserPress.bind(this);
    this.handleReportPost = this.handleReportPost.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
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
        setTimeout(() => {this.setState({ doubleTapOpacity: 1 })}, 200); // Return image opacity to normal after double tap
      } else {
        this.unlike();
        setTimeout(() => {this.setState({ doubleTapOpacity: 1 })}, 200);
      }
    }

    this.setState({
      lastPress: new Date().getTime(), // Reset the time of the last image press
    })
  }

  handleLikePress() { // When like icon is pressed
    if (!this.state.liked) {
      this.like();
    } else {
      this.unlike();
    }
  }

  handlePlayVideo() {
    this.setState({
      playBtn: false,
      paused: false,
      muted: false,
    });
  }

  handlePauseVideo() {
    this.setState({
      playBtn: true,
      paused: true,
      muted: true,
    });
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

  handleUserPress() {
    this.props.getPostUser(this.props.postUser);
  }

  handleReportPost() {
    console.log('working...');
    setTimeout(() => prompt(
      'Report Post',
      'Please provide a reason for reporting.',
      [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { text: 'Ok',
          onPress: (message) => {
            console.log(message);
            this.props.reportPost(this.props.token, this.props.postID, this.props.user.random_user_id, message)
            .then((res) => {
              console.log(res);
            });
          }
        },
      ],
      'message',
      null,
      [this.props.message],
    ), 600)
  }

  handleEditPost() {
    console.log('working...');
    setTimeout(() => prompt(
      'Edit Post',
      'Update the caption of your post',
      [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { text: 'Ok',
          onPress: (caption) => {
            console.log(caption);
            this.props.updatePost(this.props.token, this.props.postID, caption)
            .then((res) => {
              console.log(res);
            });
          }
        },
      ],
      'caption',
      null,
      [this.props.caption],
    ), 600)
  }

  handleDeletePost() {
    setTimeout(() => alert(
      '',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { text: 'Ok',
          onPress: () => {
            this.props.deletePost(this.props.token, this.props.postID)
            .then((res) => {
              console.log(res);
            });
          }
        },
      ],
    ), 600)
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <Flex>
          <Flex.Item>
            <TouchableOpacity onPress={this.handleUserPress}>
              <Text style={styles.userName}>{this.props.postUser.username}</Text>
            </TouchableOpacity>
            <Text style={styles.challengeName}>{this.props.challenge}</Text>
          </Flex.Item>
          <Flex.Item alignItems="flex-end">
            <TouchableOpacity
              onPress={() => {
                if (this.props.user.random_user_id == this.props.postUser.random_user_id) {
                  operation([
                    { text: 'Edit Post', onPress: this.handleEditPost },
                    { text: 'Delete Post', onPress: this.handleDeletePost },
                  ])
                }
                else {
                  operation([
                    { text: 'Report Post', onPress: this.handleReportPost },
                  ])
                }
              }}
            >
              <Icon name="ios-more" size={28} />
              </TouchableOpacity>
          </Flex.Item>
          </Flex>
        </WingBlank>
        <WhiteSpace size="xs" />
        <Flex justifyContent="center" style={{backgroundColor: 'darkgrey', opacity: this.state.doubleTapOpacity}}>
          <TouchableWithoutFeedback
            onPress={this.handleImagePress}
          >
            {this.props.isVideo
            ?
            <View>
              <Video
                source={{uri: this.props.mediaUrl, mainVer: 1, patchVer: 0}}
                ref={(ref) => {
                  this.player = ref
                }}
                rate={1.0}
                volume={1.0}
                muted={this.state.muted}
                paused={this.state.paused}
                resizeMode="cover"
                repeat={true}
                onLoad={response => {
                  const { width, height } = response.naturalSize;
                  const heightScaled = 1.9 * height * (this.state.screenWidth / width);

                  this.setState({
                    heightScaled: heightScaled,
                    videoPaused: false,
                    loaded: true,
                  });
                }}
                style={{
                  width: this.state.screenWidth,
                  height: this.state.heightScaled,
                  opacity: this.state.doubleTapOpacity,
                }}
              />
            {this.state.playBtn
              ?
              <TouchableOpacity
                style={{ position: 'absolute', top: '45%', left: '47%' }}
                onPress={this.handlePlayVideo}
              >
                <Icon
                  style={styles.iconBackground}
                  name="ios-play"
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onPress={this.handlePauseVideo}
              >
              </TouchableOpacity>
            }

            </View>
            :
            <Image
              source={{ uri: this.props.mediaUrl }}
              width={Dimensions.get('window').width}
              height={(Dimensions.get('window').height * .6)}
              onLoad={this.onImageLoad}
              style={{ opacity: this.state.doubleTapOpacity }}
            />
            }

        </TouchableWithoutFeedback>
        </Flex>
        <WhiteSpace size="sm" />
        <WingBlank size="md">
          <Flex>
            <TouchableOpacity onPress={this.handleLikePress} style={{ width: 25}}>
              <View>
                <Icon
                  name={this.state.liked ? "md-heart" : "md-heart-outline"}
                  size={24}
                />
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

export default connect(mapStateToProps, { addLike, deleteLike, updatePost, deletePost, reportPost })(ChallengeSubmission);
