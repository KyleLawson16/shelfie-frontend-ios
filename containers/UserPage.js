import React, { Component } from 'react';
import { Dimensions, View, ScrollView, RefreshControl } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchUser, fetchPosts } from '../actions';

import UserInfo from '../components/UserInfo';
import UserSubmissions from '../components/UserSubmissions';
import UserFormWrapper from '../components/UserForm';
import ChallengeSubmission from '../components/ChallengeSubmission';
import ProfilePicture from '../components/ProfilePicture';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      editMode: false,
      userPosts: false,
      totalPoints: 0,
      selectedPost: false,
      profilePicture: false,
      refreshing: false,
    };

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.editProfilePicture = this.editProfilePicture.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser(this.props.token, this.props.user.random_user_id)
    .then((res) => {
      this.setState({ user: res.payload.data });
    });
    this.props.fetchPosts(this.props.token, 'user', this.props.user.random_user_id)
    .then((res) => {
      var totalPoints = 0;
      res.payload.data.forEach(post => {
        totalPoints += post.challenge.point_value;
      })
      this.setState({ userPosts: res.payload.data, totalPoints: totalPoints });
    });
  }
  _onRefresh() {
    this.setState({refreshing: true });
    this.props.fetchUser(this.props.token, this.props.user.random_user_id)
    .then((res) => {
      this.setState({ user: res.payload.data, refreshing: false });
    });
  }

  handleEditBtn(editMode) {
    if (!this.props.other) {
      this.setState({ editMode: editMode });
    }
  }
  handleSave(value) {
    this.setState({ editMode: false });
  }
  getSelectedPost(post) {
    this.props.getSelectedPost(post);
  }
  handleLogout() {
    this.props.handleLogout();
  }
  editProfilePicture() {
    this.setState({ profilePicture: true });
  }
  getPath(path) {
    this.setState({ profilePicturePath: path });
  }
  finishEdit() {
    this.setState({ profilePicture: false });
  }

  render() {
    if (this.props.selectedPost) {
      return (
        <View style={styles.container}>
          <ChallengeSubmission
            token={this.props.token}
            user={this.props.user}
            postID={this.props.selectedPost.random_post_id}
            postUser={this.props.selectedPost.user}
            challenge={this.props.selectedPost.challenge.name}
            caption={this.props.selectedPost.caption}
            mediaUrl={this.props.selectedPost.media_url}
            isVideo={this.props.selectedPost.is_video}
            likes={this.props.selectedPost.likes}
          />
        </View>
      )
    }
    else if (this.state.profilePicture) {
      return (
        <View style={styles.container}>
          <ProfilePicture
            token={this.props.token}
            path={this.getPath.bind(this)}
            user={this.props.user}
            finishEdit={this.finishEdit}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
        {this.state.refreshing
        ?
        <View
          style={{position:'absolute', top: 10,
            width:Dimensions.get('window').width, height:60,
            alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator
              animating={true}
              size={50}
              thickness={1}
              color="rgb(0,206,202)"
            />
        </View>
        :
        null
        }
            {
              this.state.editMode
              ?
              <ScrollView>
                <UserFormWrapper handleSave={this.handleSave} />
              </ScrollView>
              :
              <ScrollView
                refreshControl={
                  <RefreshControl
                    tintColor="transparent"
                    colors={['transparent']}
                    style={{backgroundColor: 'transparent'}}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
              >
                {this.state.user
                  ?
                  <UserInfo
                    token={this.props.token}
                    user={this.state.user}
                    totalPoints={this.state.totalPoints}
                    other={this.props.other}
                    handleEditBtn={this.handleEditBtn}
                    handleLogout={this.handleLogout}
                    editProfilePicture={this.editProfilePicture}
                    profilePicturePath={this.state.profilePicturePath}
                    activeUser={this.props.activeUser}
                  />
                  :
                  null
                }
                <WhiteSpace />
                {this.state.userPosts
                  ?
                  <UserSubmissions
                    token={this.props.token}
                    user={this.props.user}
                    userPosts={this.state.userPosts}
                    getSelectedPost={this.getSelectedPost}
                  />
                  :
                  null
                }
              </ScrollView>
            }
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchUser, fetchPosts })(UserPage);
