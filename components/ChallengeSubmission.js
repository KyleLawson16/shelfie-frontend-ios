import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  AppRegistry,
  Clipboard,
  ToastAndroid,
  AlertIOS,
  Platform
} from 'react-native';
import { Flex, WhiteSpace, WingBlank, Modal } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import Share, {ShareSheet, Button} from 'react-native-share';
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
      shareVisible: false,
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
    this.handleSharePress = this.handleSharePress.bind(this);
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

  handleSharePress() {
    this.setState({ shareVisible: true });
  }
  onCancel() {
    console.log("CANCEL")
    this.setState({ shareVisible: false });
  }

  render() {
    let shareOptions = {
      title: "Shelfie Challenge",
      message: "This is a test.",
      url: `${this.props.mediaUrl}`,
      subject: "Share Link" //  for email
    };

    return (
      <View style={{ backgroundColor: '#fff' }}>
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <Flex>
          <Flex.Item>
            {this.props.userPage
              ?
              <Text style={styles.userName}>{this.props.postUser.username}</Text>
              :
              <TouchableOpacity onPress={this.handleUserPress}>
                <Text style={styles.userName}>{this.props.postUser.username}</Text>
              </TouchableOpacity>
            }
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
            <Flex.Item style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={this.handleLikePress} style={{ width: 25}}>
                <View>
                  <Icon
                    name={this.state.liked ? "md-heart" : "md-heart-outline"}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              <Text style={{marginTop: 3}}>{this.props.likes.length + this.state.likes} likes</Text>
            </Flex.Item>
            <Flex.Item alignItems="flex-end">
              <TouchableOpacity onPress={this.handleSharePress} style={{ width: 20 }}>
                <View>
                  <Icon
                    name={"md-share"}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </Flex.Item>
          </Flex>
          <Flex>
            <Text>{this.props.caption}</Text>
          </Flex>
        </WingBlank>
        <WhiteSpace size="lg" />
          <ShareSheet visible={this.state.shareVisible} onCancel={this.onCancel.bind(this)}>
            <Button iconSrc={{ uri: TWITTER_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "twitter"
                  }));
                },300);
              }}>Twitter</Button>
            <Button iconSrc={{ uri: FACEBOOK_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "facebook"
                  }));
                },300);
              }}>Facebook</Button>
          </ShareSheet>
      </View>
    )
  }
}

//  twitter icon
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";


function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { addLike, deleteLike, updatePost, deletePost, reportPost })(ChallengeSubmission);
