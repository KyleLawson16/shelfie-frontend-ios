import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import UserInfo from '../components/UserInfo';
import UserSubmissions from '../components/UserSubmissions';
import UserFormWrapper from '../components/UserForm';
import ChallengeSubmission from '../components/ChallengeSubmission';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      userPosts: false,
      totalPoints: 0,
      selectedPost: false,
    };

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.token, 'user', this.props.user.random_user_id)
    .then((res) => {
      console.log(res);
      var totalPoints = 0;
      res.payload.data.forEach(post => {
        totalPoints += post.challenge.point_value;
      })
      this.setState({ userPosts: res.payload.data, totalPoints: totalPoints });
    });
  }

  handleEditBtn(editMode) {
    if (this.props.other) {
      console.log('follow user');
    }
    else {
      this.setState({ editMode: editMode });
    }
  }
  handleSave(value) {
    this.setState({ editMode: false });
  }
  getSelectedPost(post) {
    this.props.getSelectedPost(post);
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
    else {
      return (
        <View style={styles.container}>
            {
              this.state.editMode
              ?
              <ScrollView>
                <UserFormWrapper handleSave={this.handleSave} />
              </ScrollView>
              :
              <ScrollView>
                <UserInfo
                  user={this.props.user}
                  handleEditBtn={this.handleEditBtn}
                  totalPoints={this.state.totalPoints}
                  other={this.props.other}
                />
                <WhiteSpace />
                <UserSubmissions
                  token={this.props.token}
                  user={this.props.user}
                  userPosts={this.state.userPosts}
                  getSelectedPost={this.getSelectedPost}
                />
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

export default connect(mapStateToProps, { fetchPosts })(UserPage);
