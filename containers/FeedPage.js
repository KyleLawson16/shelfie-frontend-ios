import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Flex, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import ChallengeSubmission from '../components/ChallengeSubmission';

class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: false, loading: true }
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.token, 'game', this.props.gameID)
    .then((res) => {
      console.log(res);
      this.setState({ posts: res.payload.data, loading: false });
    });
  }

  getPostUser(user) {
    this.props.getPostUser(user);
  }

  render() {
    return (
      <ScrollView style={styles.containerBackground}>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Game Feed</Text>
        </Flex>
        <FlatList
          data={this.state.posts}
          renderItem={({item}) =>
            <ChallengeSubmission
              token={this.props.token}
              user={this.props.user}
              postID={item.random_post_id}
              key={item.random_post_id}
              postUser={item.user}
              challenge={item.challenge.name}
              caption={item.caption}
              mediaUrl={item.media_url}
              isVideo={item.is_video}
              likes={item.likes}
              getPostUser={this.getPostUser.bind(this)}
            />
          }
          keyExtractor={(item, index) => index}
          style={{ marginBottom: 83}}
        />
        <ActivityIndicator
          animating={this.state.loading}
          size="large"
          color="rgb(93,188,210)"
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchPosts })(FeedPage);
